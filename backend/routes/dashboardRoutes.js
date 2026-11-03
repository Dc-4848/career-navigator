const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const UserRoadmapProgress = require('../models/UserRoadmapProgress');
const LearningResource = require('../models/LearningResource');
const Opportunity = require('../models/Opportunity');
const ApplicationTracker = require('../models/ApplicationTracker');
const auth = require('../middleware/auth');
const ROADMAPS = require('../data/roadmapsData');

// GET /dashboard/stats - Comprehensive Aggregated Student Dashboard
router.get('/stats', auth, async (req, res) => {
  try {
    const [profile, roadmapsProgress, savedResources, savedOpportunities, applications] = await Promise.all([
      Profile.findOne({ user: req.user }).lean(),
      UserRoadmapProgress.find({ user: req.user }).lean(),
      LearningResource.find({ savedBy: req.user }).lean(),
      Opportunity.find({ savedBy: req.user }).lean(),
      ApplicationTracker.find({ user: req.user }).lean(),
    ]);

    // Profile Completion %
    let profileFields = 0;
    let filledFields = 0;
    const p = profile || {};
    profileFields += 5;
    if (p.degree) filledFields++;
    if (p.year) filledFields++;
    if (p.skills && p.skills.length > 0) filledFields++;
    if (p.goal) filledFields++;
    if (p.selectedDomain) filledFields++;
    const profileCompletionPercent = Math.round((filledFields / profileFields) * 100);

    // Roadmap Progress Metrics
    let totalCompletedStages = 0;
    let totalCompletedTopics = 0;
    const activeRoadmaps = roadmapsProgress.map(rp => {
      const match = ROADMAPS.find(r => r.id === rp.roadmapId);
      const totalStages = match?.stages?.length || 6;
      const completedCount = rp.completedStages?.length || 0;
      totalCompletedStages += completedCount;
      totalCompletedTopics += (rp.completedTopics?.length || 0);
      const percent = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;

      return {
        roadmapId: rp.roadmapId,
        title: rp.title || match?.title,
        category: rp.category || match?.category,
        totalStages,
        completedStages: rp.completedStages,
        completedCount,
        percent,
        activeStage: rp.activeStage || 1,
        lastActiveAt: rp.lastActiveAt,
      };
    });

    const overallLearningProgress = activeRoadmaps.length > 0
      ? Math.round(activeRoadmaps.reduce((acc, curr) => acc + curr.percent, 0) / activeRoadmaps.length)
      : 0;

    // Applications Tracker Breakdown
    const applicationStatusCounts = {
      Saved: 0,
      Applied: 0,
      Assessment: 0,
      Interview: 0,
      Rejected: 0,
      Offered: 0,
    };
    applications.forEach(app => {
      if (applicationStatusCounts[app.status] !== undefined) {
        applicationStatusCounts[app.status]++;
      }
    });

    // Upcoming Deadlines (within next 30 days)
    const upcomingDeadlines = applications
      .filter(app => app.deadline && app.deadline.trim() !== '')
      .map(app => ({
        id: app._id,
        title: app.title,
        company: app.company,
        status: app.status,
        deadline: app.deadline,
      }))
      .slice(0, 5);

    // Recommended Next Step Calculation
    let nextStep = 'Explore Tech Domains to select your specialization.';
    if (profileCompletionPercent < 80) {
      nextStep = 'Complete your student profile with target skills and graduation year.';
    } else if (activeRoadmaps.length === 0) {
      nextStep = 'Choose and start your first 12-week learning roadmap from our catalog.';
    } else if (overallLearningProgress < 100) {
      const active = activeRoadmaps[0];
      nextStep = `Continue ${active.title} — Advance to Stage ${active.activeStage}.`;
    } else if (applications.length === 0) {
      nextStep = 'Browse internships & entry-level opportunities matching your skills and submit applications.';
    }

    res.json({
      profile: {
        completionPercent: profileCompletionPercent,
        degree: p.degree || '',
        skills: p.skills || [],
        goal: p.goal || '',
      },
      learning: {
        overallProgressPercent: overallLearningProgress,
        totalCompletedStages,
        totalCompletedTopics,
        activeRoadmapsCount: activeRoadmaps.length,
        activeRoadmaps,
        savedResourcesCount: savedResources.length,
      },
      opportunities: {
        savedOpportunitiesCount: savedOpportunities.length,
        totalApplicationsTracked: applications.length,
        applicationStatusCounts,
        upcomingDeadlines,
      },
      nextStep,
    });
  } catch (err) {
    console.error('Dashboard Stats Error:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;
