const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const CommunityPost = require('../models/CommunityPost');
const CommunityComment = require('../models/CommunityComment');
const User = require('../models/User');
const Profile = require('../models/Profile');

// Optional auth helper to extract user ID without rejecting unauthenticated calls
const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.userId;
  } catch {
    // Ignore invalid tokens in optional auth
  }
  next();
};

// Format post output consistently
const formatPost = (post, currentUserId) => {
  const p = post.toObject ? post.toObject() : post;
  const currentUserIdStr = currentUserId ? currentUserId.toString() : null;

  const isLiked = currentUserIdStr
    ? (p.likes || []).some(id => id.toString() === currentUserIdStr)
    : false;

  const isMyPost = currentUserIdStr && p.author
    ? p.author._id
      ? p.author._id.toString() === currentUserIdStr
      : p.author.toString() === currentUserIdStr
    : false;

  let formattedPoll = null;
  if (p.poll && p.poll.question && Array.isArray(p.poll.options) && p.poll.options.length > 0) {
    const totalVotes = p.poll.options.reduce((sum, opt) => sum + (opt.votes ? opt.votes.length : 0), 0);
    let myVotedOptionIndex = null;

    const formattedOptions = p.poll.options.map((opt, idx) => {
      const votesCount = opt.votes ? opt.votes.length : 0;
      const percentage = totalVotes > 0 ? Math.round((votesCount / totalVotes) * 100) : 0;
      const hasVotedForThis = currentUserIdStr && opt.votes
        ? opt.votes.some(v => v.toString() === currentUserIdStr)
        : false;

      if (hasVotedForThis) {
        myVotedOptionIndex = idx;
      }

      return {
        _id: opt._id,
        text: opt.text,
        votesCount,
        percentage
      };
    });

    formattedPoll = {
      question: p.poll.question,
      options: formattedOptions,
      totalVotes,
      myVotedOptionIndex,
      expiresAt: p.poll.expiresAt
    };
  }

  return {
    _id: p._id,
    author: p.author,
    authorName: p.authorName || 'Student',
    authorCollege: p.authorCollege || 'Engineering College',
    authorDegree: p.authorDegree || 'B.Tech CS',
    authorAvatar: p.authorAvatar || '',
    isVerified: Boolean(p.isVerified),
    category: p.category,
    title: p.title || '',
    content: p.content,
    image: p.image || null,
    tags: p.tags || [],
    postType: p.postType || 'discussion',
    poll: formattedPoll,
    likesCount: p.likes ? p.likes.length : 0,
    isLiked,
    commentsCount: p.commentsCount || 0,
    sharesCount: p.sharesCount || 0,
    isMyPost,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  };
};

// GET /community/posts - Fetch feed with filtering, search, and pagination
router.get('/posts', optionalAuth, async (req, res) => {
  try {
    const { category, search, postType, sort = 'latest', page = 1, limit = 10 } = req.query;

    const query = { isModerated: { $ne: true } };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (postType && postType !== 'All') {
      query.postType = postType;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { tags: searchRegex },
        { authorName: searchRegex }
      ];
    }

    const sortOption = {};
    if (sort === 'trending') {
      sortOption.commentsCount = -1;
      sortOption.createdAt = -1;
    } else if (sort === 'polls') {
      query.postType = 'poll';
      sortOption.createdAt = -1;
    } else {
      sortOption.createdAt = -1;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Check if initial seeding is needed
    const count = await CommunityPost.countDocuments(query);
    if (count === 0 && !category && !search) {
      await seedInitialCommunityPosts();
    }

    const total = await CommunityPost.countDocuments(query);
    const rawPosts = await CommunityPost.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const posts = rawPosts.map(p => formatPost(p, req.user));

    res.json({
      posts,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1
      }
    });
  } catch (err) {
    console.error('Error fetching community posts:', err);
    res.status(500).json({ message: 'Failed to fetch community posts', error: err.message });
  }
});

// GET /community/posts/:id - Fetch single post
router.get('/posts/:id', optionalAuth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await CommunityPost.findById(req.params.id).lean();
    if (!post || post.isModerated) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(formatPost(post, req.user));
  } catch (err) {
    console.error('Error fetching post detail:', err);
    res.status(500).json({ message: 'Failed to fetch post', error: err.message });
  }
});

// POST /community/posts - Create new post
router.post('/posts', auth, async (req, res) => {
  try {
    const { category, title, content, postType = 'discussion', poll, image, tags } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    const validCategories = [
      'Placement Preparation',
      'Internships',
      'Hackathons',
      'Projects',
      'Programming',
      'Data Science & AI',
      'Career Guidance',
      'College Announcements'
    ];

    if (!category || !validCategories.includes(category)) {
      return res.status(400).json({ message: 'Please select a valid community category' });
    }

    // Retrieve user details
    const user = await User.findById(req.user).lean();
    if (!user) {
      return res.status(404).json({ message: 'Authenticated user not found' });
    }

    const profile = await Profile.findOne({ user: req.user }).lean();

    const authorCollege = profile?.college || profile?.degree ? `${profile.degree || ''} Student` : 'Engineering Student';
    const authorDegree = profile?.degree || 'B.Tech Computer Science';

    // Validate poll if postType is poll or poll object provided
    let cleanPoll = null;
    if (poll && poll.question && Array.isArray(poll.options)) {
      const validOptions = poll.options
        .map(opt => (typeof opt === 'string' ? opt.trim() : opt?.text?.trim()))
        .filter(Boolean);

      if (validOptions.length < 2) {
        return res.status(400).json({ message: 'A poll must have at least 2 distinct options' });
      }

      cleanPoll = {
        question: poll.question.trim(),
        options: validOptions.map(text => ({ text, votes: [] })),
        expiresAt: poll.expiresAt ? new Date(poll.expiresAt) : null
      };
    }

    const cleanTags = Array.isArray(tags)
      ? tags.map(t => t.trim()).filter(Boolean)
      : typeof tags === 'string'
      ? tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const newPost = new CommunityPost({
      author: req.user,
      authorName: user.name,
      authorCollege,
      authorDegree,
      authorAvatar: '',
      isVerified: user.role === 'admin',
      category,
      title: title?.trim() || '',
      content: content.trim(),
      image: image || null,
      tags: cleanTags,
      postType: cleanPoll ? 'poll' : postType,
      poll: cleanPoll,
      likes: [],
      commentsCount: 0,
      sharesCount: 0
    });

    await newPost.save();
    res.status(201).json(formatPost(newPost, req.user));
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
});

// PUT /community/posts/:id - Edit own post
router.put('/posts/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.toString()) {
      return res.status(403).json({ message: 'Authorization error: You can only edit your own posts' });
    }

    const { title, content, category, tags } = req.body;

    if (content !== undefined) {
      if (!content.trim()) return res.status(400).json({ message: 'Post content cannot be empty' });
      post.content = content.trim();
    }

    if (title !== undefined) post.title = title.trim();
    if (category) post.category = category;
    if (tags !== undefined) {
      post.tags = Array.isArray(tags)
        ? tags.map(t => t.trim()).filter(Boolean)
        : [];
    }

    await post.save();
    res.json(formatPost(post, req.user));
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Failed to update post', error: err.message });
  }
});

// DELETE /community/posts/:id - Delete own post
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await User.findById(req.user).lean();
    const isAdmin = user && user.role === 'admin';

    if (post.author.toString() !== req.user.toString() && !isAdmin) {
      return res.status(403).json({ message: 'Authorization error: You can only delete your own posts' });
    }

    await CommunityPost.findByIdAndDelete(req.params.id);
    await CommunityComment.deleteMany({ post: req.params.id });

    res.json({ message: 'Post and associated comments successfully removed' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Failed to delete post', error: err.message });
  }
});

// POST /community/posts/:id/like - Like or unlike post
router.post('/posts/:id/like', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userIndex = post.likes.findIndex(id => id.toString() === req.user.toString());
    let isLiked = false;

    if (userIndex > -1) {
      post.likes.splice(userIndex, 1);
      isLiked = false;
    } else {
      post.likes.push(req.user);
      isLiked = true;
    }

    await post.save();
    res.json({ isLiked, likesCount: post.likes.length });
  } catch (err) {
    console.error('Error toggling like:', err);
    res.status(500).json({ message: 'Failed to update like status', error: err.message });
  }
});

// POST /community/posts/:id/poll/vote - Cast vote in poll
router.post('/posts/:id/poll/vote', auth, async (req, res) => {
  try {
    const { optionIndex } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    if (optionIndex === undefined || optionIndex === null || typeof optionIndex !== 'number') {
      return res.status(400).json({ message: 'Valid optionIndex is required' });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post || !post.poll || !post.poll.options) {
      return res.status(404).json({ message: 'Poll not found for this post' });
    }

    if (optionIndex < 0 || optionIndex >= post.poll.options.length) {
      return res.status(400).json({ message: 'Invalid poll option index' });
    }

    // Remove user from any existing votes in this poll (prevent duplicate votes)
    post.poll.options.forEach(opt => {
      opt.votes = opt.votes.filter(v => v.toString() !== req.user.toString());
    });

    // Add vote to chosen option
    post.poll.options[optionIndex].votes.push(req.user);

    await post.save();

    const formatted = formatPost(post, req.user);
    res.json({
      message: 'Vote registered successfully',
      poll: formatted.poll
    });
  } catch (err) {
    console.error('Error voting on poll:', err);
    res.status(500).json({ message: 'Failed to record vote', error: err.message });
  }
});

// POST /community/posts/:id/share - Increment share count
router.post('/posts/:id/share', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { sharesCount: 1 } },
      { returnDocument: 'after' }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ sharesCount: post.sharesCount });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register share', error: err.message });
  }
});

// POST /community/posts/:id/report - Report post for moderation
router.post('/posts/:id/report', auth, async (req, res) => {
  try {
    const { reason = 'Inappropriate content' } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user already reported this post
    const alreadyReported = post.reports.some(r => r.reporter.toString() === req.user.toString());
    if (alreadyReported) {
      return res.json({ message: 'You have already submitted a report for this post. Our team is reviewing it.' });
    }

    post.reports.push({
      reporter: req.user,
      reason: reason.trim()
    });

    if (post.reports.length >= 5) {
      post.isModerated = true;
    }

    await post.save();
    res.json({ message: 'Report submitted. Thank you for keeping Career Navigator constructive and safe.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit report', error: err.message });
  }
});

// GET /community/posts/:id/comments - Get comments for post
router.get('/posts/:id/comments', optionalAuth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const currentUserIdStr = req.user ? req.user.toString() : null;

    const comments = await CommunityComment.find({ post: req.params.id })
      .sort({ createdAt: 1 })
      .lean();

    const formattedComments = comments.map(c => ({
      _id: c._id,
      post: c.post,
      author: c.author,
      authorName: c.authorName,
      authorCollege: c.authorCollege,
      authorAvatar: c.authorAvatar || '',
      content: c.content,
      parentComment: c.parentComment,
      likesCount: c.likes ? c.likes.length : 0,
      isLiked: currentUserIdStr && c.likes ? c.likes.some(id => id.toString() === currentUserIdStr) : false,
      isMyComment: currentUserIdStr ? c.author.toString() === currentUserIdStr : false,
      createdAt: c.createdAt
    }));

    res.json(formattedComments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
});

// POST /community/posts/:id/comments - Add comment to post
router.post('/posts/:id/comments', auth, async (req, res) => {
  try {
    const { content, parentComment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Comment text cannot be empty' });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await User.findById(req.user).lean();
    const profile = await Profile.findOne({ user: req.user }).lean();

    const authorCollege = profile?.degree ? `${profile.degree} Student` : 'Engineering Student';

    const comment = new CommunityComment({
      post: req.params.id,
      author: req.user,
      authorName: user?.name || 'Student',
      authorCollege,
      content: content.trim(),
      parentComment: parentComment && mongoose.Types.ObjectId.isValid(parentComment) ? parentComment : null,
      likes: []
    });

    await comment.save();

    // Increment post comment counter
    post.commentsCount = (post.commentsCount || 0) + 1;
    await post.save();

    res.status(201).json({
      _id: comment._id,
      post: comment.post,
      author: comment.author,
      authorName: comment.authorName,
      authorCollege: comment.authorCollege,
      authorAvatar: '',
      content: comment.content,
      parentComment: comment.parentComment,
      likesCount: 0,
      isLiked: false,
      isMyComment: true,
      createdAt: comment.createdAt
    });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
});

// DELETE /community/comments/:id - Delete own comment
router.delete('/comments/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }

    const comment = await CommunityComment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const user = await User.findById(req.user).lean();
    const isAdmin = user && user.role === 'admin';

    if (comment.author.toString() !== req.user.toString() && !isAdmin) {
      return res.status(403).json({ message: 'Authorization error: You can only delete your own comments' });
    }

    const postId = comment.post;
    await CommunityComment.findByIdAndDelete(req.params.id);

    // Decrement post comment counter
    await CommunityPost.findByIdAndUpdate(postId, {
      $inc: { commentsCount: -1 }
    });

    res.json({ message: 'Comment removed successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
});

// Initial Community Seed Helper
async function seedInitialCommunityPosts() {
  try {
    // Find or create a system/mentor user for community anchors
    let seedAuthor = await User.findOne({ email: 'mentor@careernavigator.app' });
    if (!seedAuthor) {
      seedAuthor = new User({
        name: 'Technical Career Mentor',
        email: 'mentor@careernavigator.app',
        password: 'TemporaryPassword123!',
        role: 'admin'
      });
      await seedAuthor.save();
    }

    const seedPosts = [
      {
        author: seedAuthor._id,
        authorName: 'Aarav Sharma',
        authorCollege: 'IIT Delhi - Computer Science',
        authorDegree: 'B.Tech 4th Year',
        isVerified: true,
        category: 'Placement Preparation',
        title: 'Core DSA Patterns That Appeared in 80% of Campus Technical Rounds',
        content: `After tracking campus placements across tech companies this season, here are the 5 algorithmic patterns you should prioritize over random LeetCode grinding:\n\n1. Two Pointers / Sliding Window (String substrings, subarray sum)\n2. Fast & Slow Pointers (Cycle detection, linked list middles)\n3. Top 'K' Elements with Min-Heap (Kth largest elements, frequency sorting)\n4. Modified Binary Search (Search in rotated arrays, peak element)\n5. Level-Order BFS vs DFS (Tree path problems, graph connectivity)\n\nTip: Focus on being able to explain time and space complexity trade-offs out loud. How is your placement prep going?`,
        tags: ['DSA', 'Placements', 'Algorithms', 'InterviewPrep'],
        postType: 'discussion',
        likes: [seedAuthor._id],
        commentsCount: 2,
        sharesCount: 14
      },
      {
        author: seedAuthor._id,
        authorName: 'Sneha Patel',
        authorCollege: 'NIT Karnataka',
        authorDegree: 'B.Tech IT (3rd Year)',
        isVerified: true,
        category: 'Programming',
        title: 'Placement Preparation Language Consensus',
        content: `With upcoming placement drives focusing on live coding assessments, which programming language are you primarily using for Data Structures and Algorithms? Vote below so we can share targeted curated roadmaps.`,
        tags: ['Programming', 'Poll', 'Placements'],
        postType: 'poll',
        poll: {
          question: 'Which programming language are you primarily preparing for placements?',
          options: [
            { text: 'Java', votes: [seedAuthor._id] },
            { text: 'C++', votes: [] },
            { text: 'Python', votes: [] },
            { text: 'JavaScript / TypeScript', votes: [] }
          ]
        },
        likes: [seedAuthor._id],
        commentsCount: 4,
        sharesCount: 8
      },
      {
        author: seedAuthor._id,
        authorName: 'Rohan Verma',
        authorCollege: 'BITS Pilani',
        authorDegree: 'B.E. Computer Science',
        isVerified: false,
        category: 'Projects',
        title: 'Built an Open-Source Microservices Job Application Tracker with React & Express',
        content: `Just wrapped up milestone 4 of my portfolio capstone: an event-driven application tracking board. Key technical features include MongoDB Atlas connection pooling, JWT stateless session authentication, and automated deadline reminders.\n\nLooking for code review and constructive feedback from fellow developers!`,
        tags: ['WebDev', 'React', 'Express', 'Portfolio', 'FullStack'],
        postType: 'showcase',
        likes: [seedAuthor._id],
        commentsCount: 1,
        sharesCount: 5
      },
      {
        author: seedAuthor._id,
        authorName: 'Career Navigator Academic Team',
        authorCollege: 'Platform Announcement',
        authorDegree: 'Staff Verified',
        isVerified: true,
        category: 'College Announcements',
        title: 'Off-Campus & Remote Internship Drives: Verification Checklist',
        content: `Reminder to all students applying to summer internships: Always verify official company career domains. Never pay for technical assessments, equipment, or screening tests. Legitimate employers will never ask for monetary deposits during hiring rounds.\n\nUse our Opportunity Tracker to keep detailed logs of submission dates and interview stages.`,
        tags: ['Internships', 'Safety', 'CareerGuidance'],
        postType: 'announcement',
        likes: [seedAuthor._id],
        commentsCount: 0,
        sharesCount: 21
      }
    ];

    await CommunityPost.insertMany(seedPosts);
    console.log('Seeded initial community posts successfully.');
  } catch (seedErr) {
    console.warn('Initial community post seeding notice:', seedErr.message);
  }
}

module.exports = router;
