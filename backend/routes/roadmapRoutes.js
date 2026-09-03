const express = require('express');
const Roadmap = require('../models/Roadmap');
const auth = require('../middleware/auth');
const router = express.Router();

// Get saved roadmap for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ user: req.user });
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    res.json(roadmap);
  } catch (error) {
    console.error('Get Roadmap Error:', error);
    res.status(500).json({ message: 'Unable to fetch roadmap. Please try again.' });
  }
});

// Handler to save or update roadmap
const saveRoadmapHandler = async (req, res) => {
  try {
    const { roadmapData } = req.body;
    if (!roadmapData) {
      return res.status(400).json({ message: 'Roadmap data is required' });
    }

    let roadmap = await Roadmap.findOne({ user: req.user });

    if (roadmap) {
      roadmap.roadmapData = roadmapData;
    } else {
      roadmap = new Roadmap({ user: req.user, roadmapData });
    }

    await roadmap.save();
    res.json(roadmap);
  } catch (error) {
    console.error('Save Roadmap Error:', error);
    res.status(500).json({ message: 'Unable to save roadmap. Please try again.' });
  }
};

const roadmapService = require('../services/ai/roadmapService');

// Generate AI Roadmap using local Qwen3 model
router.post('/generate', auth, async (req, res) => {
  try {
    const { degree, year, skills, interests, goal, selectedDomain } = req.body;
    const generated = await roadmapService.generateRoadmap({ degree, year, skills, interests, goal, selectedDomain });
    
    // Save to database automatically
    let roadmap = await Roadmap.findOne({ user: req.user });
    if (roadmap) {
      roadmap.roadmapData = generated;
    } else {
      roadmap = new Roadmap({ user: req.user, roadmapData: generated });
    }
    await roadmap.save();

    res.json(roadmap);
  } catch (error) {
    console.error('Generate Roadmap Error:', error);
    res.status(500).json({ message: 'Unable to generate AI roadmap. Please try again.' });
  }
});

// Support both POST / and POST /save
router.post('/save', auth, saveRoadmapHandler);
router.post('/', auth, saveRoadmapHandler);

module.exports = router;

