const express = require('express');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update profile
router.post('/', auth, async (req, res) => {
  try {
    const { degree, year, skills, interests, goal, selectedDomain } = req.body;
    let profile = await Profile.findOne({ user: req.user });

    if (profile) {
      profile.degree = degree || profile.degree;
      profile.year = year || profile.year;
      profile.skills = skills || profile.skills;
      profile.interests = interests || profile.interests;
      profile.goal = goal || profile.goal;
      profile.selectedDomain = selectedDomain || profile.selectedDomain;
    } else {
      profile = new Profile({
        user: req.user,
        degree, year, skills, interests, goal, selectedDomain
      });
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
