const express = require('express');
const router = express.Router();
const UserRoadmapProgress = require('../models/UserRoadmapProgress');
const auth = require('../middleware/auth');
const ROADMAPS = require('../data/roadmapsData');

const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return next();
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.userId || decoded.id;
  } catch (e) {}
  next();
};

// GET /roadmaps/catalog - Catalog of all structured roadmaps
router.get('/catalog', optionalAuth, async (req, res) => {
  try {
    const { search, category, difficulty } = req.query;

    let userProgressMap = {};
    if (req.user) {
      const allProgress = await UserRoadmapProgress.find({ user: req.user }).lean();
      allProgress.forEach(p => {
        userProgressMap[p.roadmapId] = p;
      });
    }

    let filtered = ROADMAPS.filter(r => {
      const matchSearch = !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase()) ||
        r.requiredSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));

      const matchCat = !category || category === 'All' || r.category.toLowerCase() === category.toLowerCase();
      const matchDiff = !difficulty || difficulty === 'All' || r.difficulty.toLowerCase() === difficulty.toLowerCase();

      return matchSearch && matchCat && matchDiff;
    });

    const catalog = filtered.map(r => {
      const userProgress = userProgressMap[r.id];
      const completedStagesCount = userProgress?.completedStages?.length || 0;
      const totalStages = r.stages.length;
      const progressPercent = totalStages > 0 ? Math.round((completedStagesCount / totalStages) * 100) : 0;

      return {
        id: r.id,
        title: r.title,
        category: r.category,
        icon: r.icon,
        difficulty: r.difficulty,
        duration: r.duration,
        requiredSkills: r.requiredSkills,
        description: r.description,
        totalStages,
        completedStagesCount,
        progressPercent,
        isStarted: !!userProgress,
        isBookmarked: userProgress?.isBookmarked || false,
        activeStage: userProgress?.activeStage || 1,
      };
    });

    res.json(catalog);
  } catch (err) {
    console.error('Roadmaps Catalog Error:', err);
    res.status(500).json({ message: 'Failed to fetch roadmap catalog' });
  }
});

// GET /roadmaps/:id - Full details of a roadmap with stages & progress
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const roadmap = ROADMAPS.find(r => r.id === req.params.id);
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    let userProgress = null;
    if (req.user) {
      userProgress = await UserRoadmapProgress.findOne({ user: req.user, roadmapId: req.params.id }).lean();
    }

    const completedStages = userProgress?.completedStages || [];
    const completedTopics = userProgress?.completedTopics || [];
    const totalStages = roadmap.stages.length;
    const progressPercent = totalStages > 0 ? Math.round((completedStages.length / totalStages) * 100) : 0;

    res.json({
      ...roadmap,
      progress: {
        isStarted: !!userProgress,
        isBookmarked: userProgress?.isBookmarked || false,
        completedStages,
        completedTopics,
        activeStage: userProgress?.activeStage || 1,
        progressPercent,
        notes: userProgress?.notes || '',
        lastActiveAt: userProgress?.lastActiveAt || null,
      }
    });
  } catch (err) {
    console.error('Roadmap Details Error:', err);
    res.status(500).json({ message: 'Failed to fetch roadmap details' });
  }
});

// POST /roadmaps/:id/progress - Toggle stage or topic completion
router.post('/:id/progress', auth, async (req, res) => {
  try {
    const roadmap = ROADMAPS.find(r => r.id === req.params.id);
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    const { stageNumber, topic, activeStage, notes } = req.body;

    let progress = await UserRoadmapProgress.findOne({ user: req.user, roadmapId: req.params.id });
    if (!progress) {
      progress = new UserRoadmapProgress({
        user: req.user,
        roadmapId: roadmap.id,
        title: roadmap.title,
        category: roadmap.category,
        completedStages: [],
        completedTopics: [],
        activeStage: 1,
      });
    }

    // Toggle stage
    if (typeof stageNumber === 'number') {
      const idx = progress.completedStages.indexOf(stageNumber);
      if (idx > -1) {
        progress.completedStages.splice(idx, 1);
      } else {
        progress.completedStages.push(stageNumber);
      }
    }

    // Toggle topic
    if (topic && typeof topic === 'string') {
      const topicIdx = progress.completedTopics.indexOf(topic);
      if (topicIdx > -1) {
        progress.completedTopics.splice(topicIdx, 1);
      } else {
        progress.completedTopics.push(topic);
      }
    }

    if (activeStage) progress.activeStage = activeStage;
    if (notes !== undefined) progress.notes = notes;
    progress.lastActiveAt = new Date();

    await progress.save();

    const progressPercent = Math.round((progress.completedStages.length / roadmap.stages.length) * 100);

    res.json({
      message: 'Progress updated successfully',
      progress: {
        completedStages: progress.completedStages,
        completedTopics: progress.completedTopics,
        activeStage: progress.activeStage,
        progressPercent,
        notes: progress.notes,
        lastActiveAt: progress.lastActiveAt,
      }
    });
  } catch (err) {
    console.error('Save Roadmap Progress Error:', err);
    res.status(500).json({ message: 'Failed to update roadmap progress' });
  }
});

// POST /roadmaps/:id/bookmark - Bookmark roadmap
router.post('/:id/bookmark', auth, async (req, res) => {
  try {
    const roadmap = ROADMAPS.find(r => r.id === req.params.id);
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    let progress = await UserRoadmapProgress.findOne({ user: req.user, roadmapId: req.params.id });
    if (!progress) {
      progress = new UserRoadmapProgress({
        user: req.user,
        roadmapId: roadmap.id,
        title: roadmap.title,
        category: roadmap.category,
        isBookmarked: true,
      });
    } else {
      progress.isBookmarked = !progress.isBookmarked;
    }

    await progress.save();
    res.json({ message: progress.isBookmarked ? 'Bookmarked' : 'Unbookmarked', isBookmarked: progress.isBookmarked });
  } catch (err) {
    console.error('Bookmark Roadmap Error:', err);
    res.status(500).json({ message: 'Failed to toggle roadmap bookmark' });
  }
});

module.exports = router;
