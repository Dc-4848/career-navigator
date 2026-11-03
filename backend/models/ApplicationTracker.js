const mongoose = require('mongoose');

const applicationTrackerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  opportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' },
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: {
    type: String,
    enum: ['Saved', 'Applied', 'Assessment', 'Interview', 'Rejected', 'Offered'],
    default: 'Applied',
  },
  notes: { type: String, default: '' },
  deadline: { type: String, default: '' },
  appliedDate: { type: Date, default: Date.now },
  salaryOrStipend: { type: String, default: '' },
  location: { type: String, default: '' },
  link: { type: String, default: '' },
}, { timestamps: true });

applicationTrackerSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('ApplicationTracker', applicationTrackerSchema);
