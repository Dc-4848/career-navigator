import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MessageSquare,
  Heart,
  Share2,
  Send,
  CheckCircle2,
  Flag,
  BarChart2,
  Filter,
  Plus,
  Search,
  Trash2,
  Edit3,
  Clock,
  User,
  Compass,
  Briefcase,
  Trophy,
  Layers,
  X,
  MoreVertical,
  Bookmark,
  Check,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import api from '../api';
import hackathonEvents from '../data/hackathon-events';
import './Community.css';

const CATEGORIES = [
  'All',
  'Placement Preparation',
  'Internships',
  'Hackathons',
  'Projects',
  'Programming',
  'Data Science & AI',
  'Career Guidance',
  'College Announcements'
];

export default function Community() {
  const { state } = useAppState();
  const navigate = useNavigate();
  const currentUser = state.user;

  // Feed state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'trending' | 'polls'
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  // Create post state
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState('Placement Preparation');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPostType, setNewPostType] = useState('discussion'); // 'discussion' | 'poll' | 'showcase'
  const [showPollInputs, setShowPollInputs] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [submittingPost, setSubmittingPost] = useState(false);
  const [createError, setCreateError] = useState('');

  // Edit post state
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Active comments accordion
  const [activeCommentsPostId, setActiveCommentsPostId] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [loadingCommentsPostId, setLoadingCommentsPostId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [submittingCommentPostId, setSubmittingCommentPostId] = useState(null);

  // Menu dropdown state
  const [openMenuPostId, setOpenMenuPostId] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  }, []);

  // Fetch community posts
  const fetchPosts = useCallback(async (cat, q, sort, pNum = 1) => {
    try {
      setLoading(true);
      const params = { page: pNum, limit: 12 };
      if (cat && cat !== 'All') params.category = cat;
      if (q && q.trim()) params.search = q.trim();
      if (sort) params.sort = sort;

      const res = await api.get('/community/posts', { params });
      if (res.data?.posts) {
        setPosts(res.data.posts);
        setPagination(res.data.pagination || { total: res.data.posts.length, totalPages: 1 });
      }
    } catch (err) {
      console.error('Error fetching community posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(activeCategory, searchQuery, sortBy, page);
  }, [fetchPosts, activeCategory, sortBy, page]);

  // Handle Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPosts(activeCategory, searchQuery, sortBy, 1);
  };

  // Toggle Like on Post
  const handleToggleLike = async (postId) => {
    if (!state.token) {
      showToast('Please sign in to like community posts');
      navigate('/login');
      return;
    }

    try {
      // Optimistic update
      setPosts(prev => prev.map(p => {
        if (p._id === postId) {
          const nextIsLiked = !p.isLiked;
          const nextCount = nextIsLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1);
          return { ...p, isLiked: nextIsLiked, likesCount: nextCount };
        }
        return p;
      }));

      const res = await api.post(`/community/posts/${postId}/like`);
      if (res.data) {
        setPosts(prev => prev.map(p => {
          if (p._id === postId) {
            return { ...p, isLiked: res.data.isLiked, likesCount: res.data.likesCount };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error('Like error:', err);
      // Revert on error
      fetchPosts(activeCategory, searchQuery, sortBy, page);
    }
  };

  // Vote on Poll
  const handleVotePoll = async (postId, optionIndex) => {
    if (!state.token) {
      showToast('Please sign in to participate in student polls');
      navigate('/login');
      return;
    }

    try {
      const res = await api.post(`/community/posts/${postId}/poll/vote`, { optionIndex });
      if (res.data?.poll) {
        setPosts(prev => prev.map(p => {
          if (p._id === postId) {
            return { ...p, poll: res.data.poll };
          }
          return p;
        }));
        showToast('Vote registered in student poll');
      }
    } catch (err) {
      console.error('Poll vote error:', err);
      showToast(err.response?.data?.message || 'Failed to submit vote');
    }
  };

  // Share Post
  const handleSharePost = async (post) => {
    try {
      await api.post(`/community/posts/${post._id}/share`);
      setPosts(prev => prev.map(p => p._id === post._id ? { ...p, sharesCount: (p.sharesCount || 0) + 1 } : p));

      const shareUrl = `${window.location.origin}/community#post-${post._id}`;
      if (navigator.share) {
        await navigator.share({
          title: post.title || 'Career Navigator Community Post',
          text: post.content.substring(0, 100),
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Post link copied to clipboard');
      }
    } catch {
      showToast('Link copied to clipboard');
    }
  };

  // Report Post
  const handleReportPost = async (postId) => {
    if (!state.token) {
      showToast('Please sign in to report content');
      return;
    }
    try {
      const res = await api.post(`/community/posts/${postId}/report`, {
        reason: 'Community standards violation'
      });
      showToast(res.data?.message || 'Report submitted for review');
      setOpenMenuPostId(null);
    } catch (err) {
      showToast('Failed to submit report');
    }
  };

  // Delete Post
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/community/posts/${postId}`);
      setPosts(prev => prev.filter(p => p._id !== postId));
      showToast('Post deleted successfully');
      setOpenMenuPostId(null);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete post');
    }
  };

  // Start Editing Post
  const handleStartEdit = (post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title || '');
    setEditContent(post.content || '');
    setEditCategory(post.category);
    setOpenMenuPostId(null);
  };

  // Save Edit Post
  const handleSaveEdit = async (postId) => {
    if (!editContent.trim()) {
      showToast('Post content cannot be empty');
      return;
    }
    try {
      setSubmittingEdit(true);
      const res = await api.put(`/community/posts/${postId}`, {
        title: editTitle.trim(),
        content: editContent.trim(),
        category: editCategory
      });
      if (res.data) {
        setPosts(prev => prev.map(p => p._id === postId ? res.data : p));
        setEditingPostId(null);
        showToast('Post updated successfully');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update post');
    } finally {
      setSubmittingEdit(false);
    }
  };

  // Toggle Comments
  const handleToggleComments = async (postId) => {
    if (activeCommentsPostId === postId) {
      setActiveCommentsPostId(null);
      return;
    }
    setActiveCommentsPostId(postId);

    if (!commentsMap[postId]) {
      try {
        setLoadingCommentsPostId(postId);
        const res = await api.get(`/community/posts/${postId}/comments`);
        if (Array.isArray(res.data)) {
          setCommentsMap(prev => ({ ...prev, [postId]: res.data }));
        }
      } catch (err) {
        console.error('Error loading comments:', err);
      } finally {
        setLoadingCommentsPostId(null);
      }
    }
  };

  // Add Comment
  const handleAddComment = async (postId) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    if (!state.token) {
      showToast('Please sign in to comment');
      navigate('/login');
      return;
    }

    try {
      setSubmittingCommentPostId(postId);
      const res = await api.post(`/community/posts/${postId}/comments`, { content: text });
      if (res.data) {
        setCommentsMap(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), res.data]
        }));
        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
        setPosts(prev => prev.map(p => p._id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p));
        showToast('Comment posted');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmittingCommentPostId(null);
    }
  };

  // Delete Comment
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await api.delete(`/community/comments/${commentId}`);
      setCommentsMap(prev => ({
        ...prev,
        [postId]: (prev[postId] || []).filter(c => c._id !== commentId)
      }));
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, commentsCount: Math.max(0, (p.commentsCount || 1) - 1) } : p));
      showToast('Comment deleted');
    } catch (err) {
      showToast('Failed to delete comment');
    }
  };

  // Create Post Submit
  const handleCreatePostSubmit = async (e) => {
    e.preventDefault();
    if (!state.token) {
      showToast('Please sign in to publish community posts');
      navigate('/login');
      return;
    }

    if (!newContent.trim()) {
      setCreateError('Please write some content for your post.');
      return;
    }

    let pollPayload = null;
    if (showPollInputs) {
      const validOptions = pollOptions.map(o => o.trim()).filter(Boolean);
      if (!pollQuestion.trim() || validOptions.length < 2) {
        setCreateError('Polls require a question and at least 2 distinct choices.');
        return;
      }
      pollPayload = {
        question: pollQuestion.trim(),
        options: validOptions
      };
    }

    try {
      setSubmittingPost(true);
      setCreateError('');
      const res = await api.post('/community/posts', {
        category: newCategory,
        title: newTitle.trim(),
        content: newContent.trim(),
        postType: pollPayload ? 'poll' : newPostType,
        poll: pollPayload
      });

      if (res.data) {
        setPosts(prev => [res.data, ...prev]);
        setNewTitle('');
        setNewContent('');
        setShowPollInputs(false);
        setPollQuestion('');
        setPollOptions(['', '']);
        setIsCreating(false);
        showToast('Community post published successfully');
      }
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setSubmittingPost(false);
    }
  };

  // Helper: Format relative timestamp
  const getRelativeTime = (isoString) => {
    if (!isoString) return 'recently';
    const diff = (Date.now() - new Date(isoString).getTime()) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(isoString).toLocaleDateString();
  };

  // Helper: Get user initials
  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  // Urgent hackathons for right sidebar
  const upcomingHackathons = useMemo(() => {
    return (hackathonEvents || []).slice(0, 3);
  }, []);

  return (
    <div className="community-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="community-toast" role="status">
          <Check size={16} color="var(--accent-cyan)" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="community-container">
        {/* ========================================================= */}
        {/* LEFT COLUMN: STUDENT PROFILE & NAVIGATION SHORTCUTS */}
        {/* ========================================================= */}
        <aside className="community-sidebar-left">
          {/* Student Profile Card */}
          <div className="community-card student-profile-widget">
            <div className="profile-widget-cover"></div>
            <div className="profile-widget-avatar-wrap">
              <div className="profile-widget-avatar">
                {currentUser?.name ? getInitials(currentUser.name) : <User size={24} />}
              </div>
            </div>
            <div className="profile-widget-info">
              <h3 className="profile-widget-name">
                {currentUser?.name || 'Guest Student'}
              </h3>
              <p className="profile-widget-meta">
                {state.profile?.degree || 'Software Engineering Track'}
              </p>
              {state.profile?.selectedDomain?.name && (
                <span className="profile-track-badge">
                  <Compass size={12} /> {state.profile.selectedDomain.name}
                </span>
              )}
            </div>

            <div className="profile-widget-stats">
              <div className="widget-stat-item">
                <span className="stat-label">Skills Logged</span>
                <span className="stat-val">{state.profile?.skills?.length || 0}</span>
              </div>
              <div className="widget-stat-divider"></div>
              <div className="widget-stat-item">
                <span className="stat-label">Roadmap Stage</span>
                <span className="stat-val">Active</span>
              </div>
            </div>

            {!currentUser && (
              <div className="profile-widget-action">
                <Link to="/login" className="btn btn-primary btn-sm btn-full">
                  Sign In to Engage
                </Link>
              </div>
            )}
          </div>

          {/* Feed Filter Shortcuts */}
          <div className="community-card quick-nav-widget">
            <h4 className="widget-title">
              <Filter size={15} /> Feed Views
            </h4>
            <div className="quick-nav-list">
              <button
                className={`quick-nav-btn ${activeCategory === 'All' && sortBy === 'latest' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('All'); setSortBy('latest'); setPage(1); }}
              >
                <MessageSquare size={14} /> All Student Posts
              </button>
              <button
                className={`quick-nav-btn ${sortBy === 'polls' ? 'active' : ''}`}
                onClick={() => { setSortBy('polls'); setPage(1); }}
              >
                <BarChart2 size={14} /> Interactive Polls Only
              </button>
              <button
                className={`quick-nav-btn ${sortBy === 'trending' ? 'active' : ''}`}
                onClick={() => { setSortBy('trending'); setPage(1); }}
              >
                <Heart size={14} /> Trending Discussions
              </button>
            </div>
          </div>

          {/* Topic Channels */}
          <div className="community-card topic-channels-widget">
            <h4 className="widget-title">
              <Layers size={15} /> Topic Channels
            </h4>
            <div className="channel-chips-list">
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <button
                  key={cat}
                  className={`channel-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* CENTER COLUMN: MAIN COMMUNITY FEED & CREATE POST */}
        {/* ========================================================= */}
        <main className="community-feed-center">
          {/* Header Banner */}
          <div className="community-hero-banner">
            <div>
              <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <CheckCircle2 size={13} /> Verified Student Network
              </span>
              <h1 className="community-hero-title">Student Career Community</h1>
              <p className="community-hero-sub">
                Connect with peers across colleges, participate in placement polls, form hackathon teams, and share technical interview learnings.
              </p>
            </div>
          </div>

          {/* Create Post Area */}
          <div className="community-card create-post-card">
            {!isCreating ? (
              <div className="create-post-placeholder" onClick={() => setIsCreating(true)}>
                <div className="placeholder-avatar">
                  {currentUser?.name ? getInitials(currentUser.name) : <User size={20} />}
                </div>
                <div className="placeholder-input">
                  Share placement questions, internship updates, or create a student poll...
                </div>
                <button className="btn btn-primary btn-sm">
                  <Plus size={15} /> Post
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreatePostSubmit} className="create-post-form">
                <div className="form-header-row">
                  <h4>Create Community Discussion or Poll</h4>
                  <button
                    type="button"
                    className="close-create-btn"
                    onClick={() => { setIsCreating(false); setCreateError(''); }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {createError && (
                  <div className="form-alert-error" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertCircle size={15} /> {createError}
                  </div>
                )}

                <div className="form-category-select-row">
                  <label>Channel:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-select-sm"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Post topic or question title (optional)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="post-title-input"
                />

                <textarea
                  placeholder="What technical insights, interview experiences, or opportunities would you like to share with fellow students?"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="post-content-textarea"
                  rows={4}
                  required
                />

                {/* Poll Creator Sub-Panel */}
                {showPollInputs && (
                  <div className="poll-builder-card">
                    <div className="poll-builder-header">
                      <h5>
                        <BarChart2 size={14} /> Student Poll Options
                      </h5>
                      <button
                        type="button"
                        className="btn-text-danger"
                        onClick={() => setShowPollInputs(false)}
                      >
                        Remove Poll
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Ask your poll question (e.g. Which programming language are you preparing for placements?)"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      className="poll-question-input"
                    />

                    <div className="poll-options-grid">
                      {pollOptions.map((opt, oIdx) => (
                        <div key={oIdx} className="poll-option-row">
                          <span className="option-num-tag">{oIdx + 1}</span>
                          <input
                            type="text"
                            placeholder={`Choice ${oIdx + 1} (e.g. Java, Python, C++)`}
                            value={opt}
                            onChange={(e) => {
                              const updated = [...pollOptions];
                              updated[oIdx] = e.target.value;
                              setPollOptions(updated);
                            }}
                            className="poll-opt-input"
                          />
                          {pollOptions.length > 2 && (
                            <button
                              type="button"
                              className="poll-remove-opt-btn"
                              onClick={() => {
                                setPollOptions(pollOptions.filter((_, idx) => idx !== oIdx));
                              }}
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {pollOptions.length < 5 && (
                      <button
                        type="button"
                        className="btn btn-secondary btn-xs"
                        style={{ marginTop: 8 }}
                        onClick={() => setPollOptions([...pollOptions, ''])}
                      >
                        + Add Another Option
                      </button>
                    )}
                  </div>
                )}

                <div className="create-post-footer">
                  <div className="create-post-tools">
                    {!showPollInputs && (
                      <button
                        type="button"
                        className="tool-attach-btn"
                        onClick={() => setShowPollInputs(true)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      >
                        <BarChart2 size={15} /> Attach Poll
                      </button>
                    )}
                  </div>

                  <div className="create-post-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setIsCreating(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      disabled={submittingPost}
                    >
                      {submittingPost ? 'Publishing...' : 'Publish to Feed'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Feed Controls: Search & Category Filter Chips */}
          <div className="feed-controls-bar">
            <form onSubmit={handleSearchSubmit} className="feed-search-form">
              <Search size={15} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search discussions, placement advice, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="feed-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => { setSearchQuery(''); fetchPosts(activeCategory, '', sortBy, 1); }}
                >
                  <X size={14} />
                </button>
              )}
            </form>

            <div className="feed-sort-tabs">
              <button
                className={`sort-tab-btn ${sortBy === 'latest' ? 'active' : ''}`}
                onClick={() => setSortBy('latest')}
              >
                Latest
              </button>
              <button
                className={`sort-tab-btn ${sortBy === 'trending' ? 'active' : ''}`}
                onClick={() => setSortBy('trending')}
              >
                Trending
              </button>
              <button
                className={`sort-tab-btn ${sortBy === 'polls' ? 'active' : ''}`}
                onClick={() => setSortBy('polls')}
              >
                Polls
              </button>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {activeCategory !== 'All' && (
            <div className="active-filter-banner">
              <span>Showing: <strong>{activeCategory}</strong></span>
              <button
                className="clear-filter-pill"
                onClick={() => setActiveCategory('All')}
              >
                Clear Filter <X size={12} />
              </button>
            </div>
          )}

          {/* Posts Feed Stream */}
          {loading ? (
            <div className="feed-loading-box">
              <div className="loading-spinner"></div>
              <p>Loading community discussions and polls...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="community-card empty-feed-card">
              <MessageSquare size={36} color="var(--text-secondary)" />
              <h3>No posts found</h3>
              <p>Be the first student to start a discussion or create a poll in this channel!</p>
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: 12 }}
                onClick={() => setIsCreating(true)}
              >
                <Plus size={14} /> Create Post
              </button>
            </div>
          ) : (
            <div className="posts-stream">
              {posts.map((post) => {
                const isEditing = editingPostId === post._id;
                const isMenuOpen = openMenuPostId === post._id;
                const areCommentsOpen = activeCommentsPostId === post._id;
                const postComments = commentsMap[post._id] || [];

                return (
                  <article key={post._id} id={`post-${post._id}`} className="community-card post-card">
                    {/* Post Top Row */}
                    <div className="post-header-row">
                      <div className="post-author-block">
                        <div className="author-avatar-badge">
                          {getInitials(post.authorName)}
                        </div>
                        <div className="author-text-info">
                          <div className="author-name-line">
                            <span className="author-name">{post.authorName}</span>
                            {post.isVerified && (
                              <span className="verified-badge-pill" title="Verified Account">
                                <CheckCircle2 size={12} /> Verified
                              </span>
                            )}
                          </div>
                          <div className="author-meta-sub">
                            <span>{post.authorCollege}</span>
                            <span className="meta-dot">•</span>
                            <span className="post-timestamp" style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                              <Clock size={11} /> {getRelativeTime(post.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="post-header-actions">
                        <span className="post-category-tag">{post.category}</span>
                        <div className="post-menu-container">
                          <button
                            className="post-menu-trigger"
                            onClick={() => setOpenMenuPostId(isMenuOpen ? null : post._id)}
                            aria-label="Post options"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {isMenuOpen && (
                            <div className="post-dropdown-menu">
                              {post.isMyPost ? (
                                <>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleStartEdit(post)}
                                  >
                                    <Edit3 size={14} /> Edit Post
                                  </button>
                                  <button
                                    className="dropdown-item danger"
                                    onClick={() => handleDeletePost(post._id)}
                                  >
                                    <Trash2 size={14} /> Delete Post
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleReportPost(post._id)}
                                >
                                  <Flag size={14} /> Report Content
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Post Body: Normal vs Editing Mode */}
                    {isEditing ? (
                      <div className="inline-edit-box">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="post-title-input"
                          placeholder="Title"
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="post-content-textarea"
                          rows={4}
                        />
                        <div className="inline-edit-footer">
                          <button
                            className="btn btn-secondary btn-xs"
                            onClick={() => setEditingPostId(null)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={() => handleSaveEdit(post._id)}
                            disabled={submittingEdit}
                          >
                            {submittingEdit ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="post-body">
                        {post.title && <h3 className="post-title-heading">{post.title}</h3>}
                        <p className="post-content-text">{post.content}</p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="post-tags-row">
                            {post.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="post-tag-chip"
                                onClick={() => { setSearchQuery(tag); fetchPosts(activeCategory, tag, sortBy, 1); }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Interactive Poll Component */}
                        {post.poll && post.poll.options && (
                          <div className="post-poll-card">
                            <h4 className="poll-question-title">
                              <BarChart2 size={16} /> {post.poll.question}
                            </h4>

                            <div className="poll-options-container">
                              {post.poll.options.map((opt, optIdx) => {
                                const isMyVote = post.poll.myVotedOptionIndex === optIdx;
                                const hasVoted = post.poll.myVotedOptionIndex !== null;

                                return (
                                  <div
                                    key={opt._id || optIdx}
                                    className={`poll-option-bar-wrap ${isMyVote ? 'my-voted-option' : ''}`}
                                    onClick={() => handleVotePoll(post._id, optIdx)}
                                  >
                                    <div
                                      className="poll-bar-fill"
                                      style={{ width: `${opt.percentage}%` }}
                                    ></div>
                                    <div className="poll-option-content">
                                      <div className="poll-option-label">
                                        <span className={`poll-radio-dot ${isMyVote ? 'active' : ''}`}></span>
                                        <span className="poll-option-text">{opt.text}</span>
                                        {isMyVote && <span className="your-vote-tag">Your Choice</span>}
                                      </div>
                                      <span className="poll-option-pct">
                                        {opt.votesCount} {opt.votesCount === 1 ? 'vote' : 'votes'} ({opt.percentage}%)
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="poll-footer-info">
                              <span>Total Votes: {post.poll.totalVotes}</span>
                              {post.poll.myVotedOptionIndex !== null && (
                                <span className="voted-confirmation-text">
                                  <Check size={12} /> Vote recorded in database
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Post Action Bar */}
                    <div className="post-actions-bar">
                      <button
                        className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                        onClick={() => handleToggleLike(post._id)}
                        aria-label="Like post"
                      >
                        <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
                        <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
                      </button>

                      <button
                        className={`action-btn ${areCommentsOpen ? 'active' : ''}`}
                        onClick={() => handleToggleComments(post._id)}
                        aria-label="Toggle comments"
                      >
                        <MessageSquare size={16} />
                        <span>{post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}</span>
                      </button>

                      <button
                        className="action-btn"
                        onClick={() => handleSharePost(post)}
                        aria-label="Share post"
                      >
                        <Share2 size={16} />
                        <span>{post.sharesCount > 0 ? post.sharesCount : ''} Share</span>
                      </button>
                    </div>

                    {/* Comments Accordion Section */}
                    {areCommentsOpen && (
                      <div className="post-comments-section">
                        <div className="comments-input-row">
                          <input
                            type="text"
                            placeholder="Write a constructive student response..."
                            value={commentInputs[post._id] || ''}
                            onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddComment(post._id);
                              }
                            }}
                            className="comment-text-input"
                          />
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddComment(post._id)}
                            disabled={submittingCommentPostId === post._id}
                          >
                            <Send size={14} />
                          </button>
                        </div>

                        {loadingCommentsPostId === post._id ? (
                          <div className="comments-loading-hint">Loading responses...</div>
                        ) : postComments.length === 0 ? (
                          <div className="comments-empty-hint">No comments yet. Start the technical discussion!</div>
                        ) : (
                          <div className="comments-list">
                            {postComments.map((comment) => (
                              <div key={comment._id} className="comment-item">
                                <div className="comment-avatar">
                                  {getInitials(comment.authorName)}
                                </div>
                                <div className="comment-bubble">
                                  <div className="comment-header">
                                    <span className="comment-author">{comment.authorName}</span>
                                    <span className="comment-college">{comment.authorCollege}</span>
                                    <span className="comment-time">{getRelativeTime(comment.createdAt)}</span>
                                    {comment.isMyComment && (
                                      <button
                                        className="comment-delete-btn"
                                        onClick={() => handleDeleteComment(post._id, comment._id)}
                                        title="Delete your comment"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    )}
                                  </div>
                                  <p className="comment-text">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </main>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: HACKATHONS, DEADLINES & ROADMAPS */}
        {/* ========================================================= */}
        <aside className="community-sidebar-right">
          {/* Upcoming Hackathons Widget */}
          <div className="community-card sidebar-widget">
            <h4 className="widget-title">
              <Trophy size={15} /> Upcoming Hackathons
            </h4>
            <div className="widget-items-list">
              {upcomingHackathons.map((evt, idx) => (
                <div key={idx} className="widget-event-card">
                  <div className="event-title-line">
                    <span className="event-name">{evt.name}</span>
                    <span className="event-prize-tag">{evt.prize}</span>
                  </div>
                  <div className="event-meta-line">
                    <span>{evt.theme}</span>
                    <span className="meta-dot">•</span>
                    <span>{evt.difficulty}</span>
                  </div>
                  <Link to="/hackathons" className="widget-card-link">
                    Explore Challenge <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Roadmaps Widget */}
          <div className="community-card sidebar-widget">
            <h4 className="widget-title">
              <Compass size={15} /> Structured Roadmaps
            </h4>
            <div className="widget-roadmaps-list">
              <Link to="/roadmap" className="widget-roadmap-item">
                <span className="roadmap-title">Full Stack Web Engineering</span>
                <span className="roadmap-weeks">12 Weeks • 5 Stages</span>
              </Link>
              <Link to="/roadmap" className="widget-roadmap-item">
                <span className="roadmap-title">Machine Learning & Data Science</span>
                <span className="roadmap-weeks">16 Weeks • 6 Stages</span>
              </Link>
              <Link to="/roadmap" className="widget-roadmap-item">
                <span className="roadmap-title">Cloud DevOps & SRE</span>
                <span className="roadmap-weeks">10 Weeks • 4 Stages</span>
              </Link>
            </div>
          </div>

          {/* Platform Standards / Academic Integrity */}
          <div className="community-card sidebar-widget community-rules-widget">
            <h4 className="widget-title">
              <HelpCircle size={15} /> Student Guidelines
            </h4>
            <ul className="guidelines-list">
              <li>Share honest interview experiences and technical insights.</li>
              <li>Respect fellow students; maintain constructive collaboration.</li>
              <li>Do not post confidential assessment tests or commercial NDA questions.</li>
              <li>Verify external company career URLs before sharing.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
