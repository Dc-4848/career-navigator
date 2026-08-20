const express = require('express');
const Internship = require('../models/Internship');
const auth = require('../middleware/auth');
const router = express.Router();

// Get saved internships
router.get('/', auth, async (req, res) => {
  try {
    const internships = await Internship.find({ user: req.user });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save an internship
router.post('/save', auth, async (req, res) => {
  try {
    const { title, company, location, link, type } = req.body;
    const internship = new Internship({
      user: req.user,
      title, company, location, link, type
    });
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
