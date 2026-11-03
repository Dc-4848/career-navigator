const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  logo: { type: String, default: '' },
  location: { type: String, required: true },
  workplaceType: {
    type: String,
    enum: ['Remote', 'On-site', 'Hybrid'],
    default: 'Remote',
  },
  jobType: {
    type: String,
    enum: ['Internship', 'Fresher Job', 'Entry-Level Job', 'Off-Campus'],
    default: 'Internship',
  },
  category: { type: String, default: 'Software Development' },
  experienceLevel: { type: String, default: 'Fresher' },
  skills: { type: [String], default: [] },
  description: { type: String, required: true },
  applyUrl: { type: String, required: true },
  deadline: { type: String, default: 'Rolling Basis' },
  postedDate: { type: Date, default: Date.now },
  stipendOrSalary: { type: String, default: 'Competitive' },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

opportunitySchema.index({ category: 1, jobType: 1, workplaceType: 1 });
opportunitySchema.index({ title: 'text', company: 'text', skills: 'text' });

module.exports = mongoose.model('Opportunity', opportunitySchema);
