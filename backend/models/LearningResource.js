const mongoose = require('mongoose');

const learningResourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ['Video', 'Article', 'Documentation', 'Course', 'Book', 'Cheatsheet', 'Practice platform', 'Tool', 'Tutorial'],
    required: true,
  },
  technology: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  isFree: { type: Boolean, default: true },
  url: { type: String, required: true },
  relatedRoadmap: { type: String, default: '' },
  relatedStage: { type: String, default: '' },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

learningResourceSchema.index({ technology: 1, type: 1, difficulty: 1 });
learningResourceSchema.index({ title: 'text', description: 'text', technology: 'text' });

module.exports = mongoose.model('LearningResource', learningResourceSchema);
