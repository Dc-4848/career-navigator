const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  roadmapData: { type: Object, required: true } // The generated roadmap JSON
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
