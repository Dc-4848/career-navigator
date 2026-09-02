const express = require('express');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Unable to fetch profile. Please try again.' });
  }
});

// Create or update profile
router.post('/', auth, async (req, res) => {
  try {
    const { degree, year, skills, interests, goal, selectedDomain } = req.body;
    let profile = await Profile.findOne({ user: req.user });

    if (profile) {
      if (degree !== undefined) profile.degree = degree;
      if (year !== undefined) profile.year = year;
      if (skills !== undefined) profile.skills = Array.isArray(skills) ? skills : profile.skills;
      if (interests !== undefined) profile.interests = Array.isArray(interests) ? interests : profile.interests;
      if (goal !== undefined) profile.goal = goal;
      if (selectedDomain !== undefined) profile.selectedDomain = selectedDomain;
    } else {
      profile = new Profile({
        user: req.user,
        degree: degree || '',
        year: year || '',
        skills: Array.isArray(skills) ? skills : [],
        interests: Array.isArray(interests) ? interests : [],
        goal: goal || '',
        selectedDomain: selectedDomain || null
      });
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error('Save Profile Error:', error);
    res.status(500).json({ message: 'Unable to save your profile. Please try again.' });
  }
});

module.exports = router;
