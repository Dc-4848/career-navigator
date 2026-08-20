const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  link: { type: String },
  type: { type: String }, // e.g., 'internship', 'hackathon'
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
