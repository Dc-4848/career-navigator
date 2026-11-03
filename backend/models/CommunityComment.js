const mongoose = require('mongoose');

const communityCommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityPost', required: true, index: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  authorName: { type: String, required: true },
  authorCollege: { type: String, default: 'Engineering College' },
  authorAvatar: { type: String },
  content: { type: String, required: true, trim: true },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityComment', default: null },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reports: [{
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: { type: String },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

communityCommentSchema.index({ post: 1, createdAt: 1 });

module.exports = mongoose.model('CommunityComment', communityCommentSchema);
