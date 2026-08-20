const express = require('express');
const Roadmap = require('../models/Roadmap');
const auth = require('../middleware/auth');
const router = express.Router();

// Get saved roadmap
router.get('/', auth, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ user: req.user });
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save roadmap
router.post('/save', auth, async (req, res) => {
  try {
    const { roadmapData } = req.body;
    let roadmap = await Roadmap.findOne({ user: req.user });

    if (roadmap) {
      roadmap.roadmapData = roadmapData;
    } else {
      roadmap = new Roadmap({ user: req.user, roadmapData });
    }

    await roadmap.save();
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
