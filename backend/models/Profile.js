const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  degree: { type: String },
  year: { type: String },
  skills: { type: [String], default: [] },
  interests: { type: [String], default: [] },
  goal: { type: String },
  selectedDomain: { type: Object } // To store the selected domain object
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
