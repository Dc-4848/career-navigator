const mongoose = require('mongoose');

const pollOptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { _id: true });

const communityPostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  authorName: { type: String, required: true },
  authorCollege: { type: String, default: 'Engineering College' },
  authorDegree: { type: String, default: 'B.Tech Computer Science' },
  authorAvatar: { type: String },
  isVerified: { type: Boolean, default: false },
  category: {
    type: String,
    required: true,
    enum: [
      'Placement Preparation',
      'Internships',
      'Hackathons',
      'Projects',
      'Programming',
      'Data Science & AI',
      'Career Guidance',
      'College Announcements'
    ],
    index: true
  },
  title: { type: String, trim: true },
  content: { type: String, required: true, trim: true },
  image: { type: String },
  tags: [{ type: String, trim: true }],
  postType: {
    type: String,
    enum: ['discussion', 'poll', 'announcement', 'showcase'],
    default: 'discussion',
    index: true
  },
  poll: {
    question: { type: String, trim: true },
    options: [pollOptionSchema],
    expiresAt: { type: Date }
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  commentsCount: { type: Number, default: 0 },
  sharesCount: { type: Number, default: 0 },
  reports: [{
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  isModerated: { type: Boolean, default: false }
}, {
  timestamps: true
});

communityPostSchema.index({ createdAt: -1 });
communityPostSchema.index({ category: 1, createdAt: -1 });
communityPostSchema.index({ postType: 1, createdAt: -1 });

module.exports = mongoose.model('CommunityPost', communityPostSchema);
