const mongoose = require('mongoose');

const userRoadmapProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roadmapId: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, default: '' },
  completedStages: { type: [Number], default: [] },
  completedTopics: { type: [String], default: [] },
  activeStage: { type: Number, default: 1 },
  isBookmarked: { type: Boolean, default: false },
  notes: { type: String, default: '' },
  lastActiveAt: { type: Date, default: Date.now },
}, { timestamps: true });

userRoadmapProgressSchema.index({ user: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('UserRoadmapProgress', userRoadmapProgressSchema);
