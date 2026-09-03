const express = require('express');
const Internship = require('../models/Internship');
const auth = require('../middleware/auth');
const router = express.Router();

// Get saved internships for current user
router.get('/', auth, async (req, res) => {
  try {
    const internships = await Internship.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    console.error('Get Internships Error:', error);
    res.status(500).json({ message: 'Unable to fetch saved internships. Please try again.' });
  }
});

// Save an internship handler
const saveInternshipHandler = async (req, res) => {
  try {
    const { title, company, location, link, type } = req.body;
    if (!title || !company) {
      return res.status(400).json({ message: 'Title and company are required' });
    }

    const internship = new Internship({
      user: req.user,
      title: title.trim(),
      company: company.trim(),
      location: location || '',
      link: link || '',
      type: type || 'internship'
    });

    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    console.error('Save Internship Error:', error);
    res.status(500).json({ message: 'Unable to save internship. Please try again.' });
  }
};

// Support both POST /save and POST /
router.post('/save', auth, saveInternshipHandler);
router.post('/', auth, saveInternshipHandler);

// Delete/Unsave an internship
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Internship.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!deleted) {
      return res.status(404).json({ message: 'Saved internship not found' });
    }
    res.json({ message: 'Internship removed successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete Internship Error:', error);
    res.status(500).json({ message: 'Unable to remove internship. Please try again.' });
  }
});

const jobMatchingService = require('../services/ai/jobMatchingService');

// Calculate BGE-M3 Semantic Job Match Score
router.post('/match', auth, async (req, res) => {
  try {
    const { userSkills, degree, year, jobTitle, jobRequiredSkills, jobDescription } = req.body;
    const matchResult = await jobMatchingService.matchJob({
      userSkills,
      degree,
      year,
      jobTitle,
      jobRequiredSkills,
      jobDescription
    });
    res.json(matchResult);
  } catch (error) {
    console.error('Job Match Calculation Error:', error);
    res.status(500).json({ message: 'Unable to calculate job match score. Please try again.' });
  }
});

module.exports = router;

