const express = require('express');
const router = express.Router();
const LearningResource = require('../models/LearningResource');
const auth = require('../middleware/auth');
const CURATED_RESOURCES = require('../data/resourcesData');

// Optional auth middleware: extracts user if token present, but doesn't block unauthenticated callers
const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return next();
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.userId || decoded.id;
  } catch (e) {
    // ignore invalid token in optional auth
  }
  next();
};

// Seed resources into DB if empty
const ensureResourcesSeeded = async () => {
  try {
    const count = await LearningResource.countDocuments();
    if (count === 0) {
      await LearningResource.insertMany(CURATED_RESOURCES);
      console.log('Seeded curated learning resources to MongoDB');
    }
  } catch (err) {
    console.error('Seed Resources Error:', err.message);
  }
};

// GET /resources - Search & Filter
router.get('/', optionalAuth, async (req, res) => {
  try {
    await ensureResourcesSeeded();
    const { search, type, technology, category, difficulty, isFree } = req.query;
    
    let query = {};
    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: regex }, { description: regex }, { technology: regex }, { category: regex }];
    }
    if (type && type !== 'All') query.type = type;
    if (technology && technology !== 'All') query.technology = new RegExp(technology, 'i');
    if (category && category !== 'All') query.category = new RegExp(category, 'i');
    if (difficulty && difficulty !== 'All') query.difficulty = difficulty;
    if (isFree === 'true') query.isFree = true;

    const resources = await LearningResource.find(query).sort({ createdAt: -1 }).lean();

    const formatted = resources.map(item => ({
      ...item,
      isBookmarked: req.user ? (item.savedBy || []).some(id => id.toString() === req.user.toString()) : false,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Get Resources Error:', err);
    res.status(500).json({ message: 'Failed to fetch learning resources' });
  }
});

// GET /resources/bookmarked - Authenticated
router.get('/bookmarked', auth, async (req, res) => {
  try {
    const resources = await LearningResource.find({ savedBy: req.user }).lean();
    res.json(resources.map(item => ({ ...item, isBookmarked: true })));
  } catch (err) {
    console.error('Get Bookmarked Resources Error:', err);
    res.status(500).json({ message: 'Failed to fetch bookmarked resources' });
  }
});

// POST /resources/:id/bookmark - Toggle bookmark
router.post('/:id/bookmark', auth, async (req, res) => {
  try {
    const resource = await LearningResource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const index = resource.savedBy.findIndex(id => id.toString() === req.user.toString());
    let isBookmarked = false;
    if (index > -1) {
      resource.savedBy.splice(index, 1);
    } else {
      resource.savedBy.push(req.user);
      isBookmarked = true;
    }

    await resource.save();
    res.json({ message: isBookmarked ? 'Bookmarked' : 'Unbookmarked', isBookmarked });
  } catch (err) {
    console.error('Bookmark Resource Error:', err);
    res.status(500).json({ message: 'Failed to toggle bookmark' });
  }
});

module.exports = router;
