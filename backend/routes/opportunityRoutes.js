const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');
const ApplicationTracker = require('../models/ApplicationTracker');
const auth = require('../middleware/auth');
const CURATED_OPPORTUNITIES = require('../data/opportunitiesData');

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

const ensureOpportunitiesSeeded = async () => {
  try {
    const count = await Opportunity.countDocuments();
    if (count === 0) {
      await Opportunity.insertMany(CURATED_OPPORTUNITIES);
      console.log('Seeded curated opportunities to MongoDB');
    }
  } catch (err) {
    console.error('Seed Opportunities Error:', err.message);
  }
};

// GET /opportunities - Discover Opportunities with Filtering
router.get('/', optionalAuth, async (req, res) => {
  try {
    await ensureOpportunitiesSeeded();
    const { search, workplace, type, category, experience, sort } = req.query;

    let query = {};
    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: regex }, { company: regex }, { skills: regex }, { location: regex }];
    }
    if (workplace && workplace !== 'All') query.workplaceType = workplace;
    if (type && type !== 'All') query.jobType = type;
    if (category && category !== 'All') query.category = new RegExp(category, 'i');
    if (experience && experience !== 'All') query.experienceLevel = experience;

    let sortOption = { postedDate: -1 };
    if (sort === 'deadline') sortOption = { deadline: 1 };

    const opportunities = await Opportunity.find(query).sort(sortOption).lean();

    const formatted = opportunities.map(opp => ({
      ...opp,
      isSaved: req.user ? (opp.savedBy || []).some(id => id.toString() === req.user.toString()) : false,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Get Opportunities Error:', err);
    res.status(500).json({ message: 'Failed to fetch opportunities' });
  }
});

// POST /opportunities/:id/bookmark - Toggle bookmark
router.post('/:id/bookmark', auth, async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    const index = opp.savedBy.findIndex(id => id.toString() === req.user.toString());
    let isSaved = false;
    if (index > -1) {
      opp.savedBy.splice(index, 1);
    } else {
      opp.savedBy.push(req.user);
      isSaved = true;
    }

    await opp.save();
    res.json({ message: isSaved ? 'Saved' : 'Unsaved', isSaved });
  } catch (err) {
    console.error('Bookmark Opportunity Error:', err);
    res.status(500).json({ message: 'Failed to toggle save opportunity' });
  }
});

// GET /opportunities/saved - Get all saved opportunities
router.get('/saved', auth, async (req, res) => {
  try {
    const saved = await Opportunity.find({ savedBy: req.user }).lean();
    res.json(saved.map(item => ({ ...item, isSaved: true })));
  } catch (err) {
    console.error('Get Saved Opportunities Error:', err);
    res.status(500).json({ message: 'Failed to fetch saved opportunities' });
  }
});

// ==========================================
// APPLICATION TRACKER ENDPOINTS
// ==========================================

// GET /opportunities/applications - List tracked applications
router.get('/applications', auth, async (req, res) => {
  try {
    const applications = await ApplicationTracker.find({ user: req.user }).sort({ updatedAt: -1 }).lean();
    res.json(applications);
  } catch (err) {
    console.error('Get Applications Error:', err);
    res.status(500).json({ message: 'Failed to fetch tracked applications' });
  }
});

// POST /opportunities/applications - Track new application
router.post('/applications', auth, async (req, res) => {
  try {
    const { title, company, status, notes, deadline, salaryOrStipend, location, link, opportunityId } = req.body;
    if (!title || !company) {
      return res.status(400).json({ message: 'Title and company are required' });
    }

    const application = new ApplicationTracker({
      user: req.user,
      opportunity: opportunityId || null,
      title: title.trim(),
      company: company.trim(),
      status: status || 'Applied',
      notes: notes || '',
      deadline: deadline || '',
      salaryOrStipend: salaryOrStipend || '',
      location: location || '',
      link: link || '',
    });

    await application.save();
    res.status(201).json(application);
  } catch (err) {
    console.error('Create Application Error:', err);
    res.status(500).json({ message: 'Failed to create application tracker record' });
  }
});

// PUT /opportunities/applications/:id - Update status or notes
router.put('/applications/:id', auth, async (req, res) => {
  try {
    const { status, notes, deadline, location, salaryOrStipend } = req.body;
    const application = await ApplicationTracker.findOne({ _id: req.params.id, user: req.user });
    if (!application) {
      return res.status(404).json({ message: 'Tracked application not found' });
    }

    if (status) application.status = status;
    if (notes !== undefined) application.notes = notes;
    if (deadline !== undefined) application.deadline = deadline;
    if (location !== undefined) application.location = location;
    if (salaryOrStipend !== undefined) application.salaryOrStipend = salaryOrStipend;

    await application.save();
    res.json(application);
  } catch (err) {
    console.error('Update Application Error:', err);
    res.status(500).json({ message: 'Failed to update application tracker record' });
  }
});

// DELETE /opportunities/applications/:id - Delete tracked application
router.delete('/applications/:id', auth, async (req, res) => {
  try {
    const deleted = await ApplicationTracker.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!deleted) {
      return res.status(404).json({ message: 'Application record not found' });
    }
    res.json({ message: 'Application record deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('Delete Application Error:', err);
    res.status(500).json({ message: 'Failed to delete application record' });
  }
});

module.exports = router;
