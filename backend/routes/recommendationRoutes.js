const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Opportunity = require('../models/Opportunity');
const LearningResource = require('../models/LearningResource');
const auth = require('../middleware/auth');
const ROADMAPS = require('../data/roadmapsData');

// GET /recommendations - Personalized AI & Profile-driven Career Recommendations
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user }).lean() || {};
    const userSkills = (profile.skills || []).map(s => s.toLowerCase());
    const domain = typeof profile.selectedDomain === 'string'
      ? profile.selectedDomain.toLowerCase()
      : (profile.selectedDomain?.name || '').toLowerCase();
    const goal = (profile.goal || '').toLowerCase();

    // 1. Recommended Roadmaps with Explanations
    const recommendedRoadmaps = ROADMAPS.map(r => {
      let score = 0;
      let reasons = [];

      // Check domain match
      if (domain && (r.category.toLowerCase().includes(domain) || r.title.toLowerCase().includes(domain))) {
        score += 45;
        reasons.push(`Directly targets your selected domain (${profile.selectedDomain?.name || profile.selectedDomain})`);
      }

      // Check goal match
      if (goal && (r.title.toLowerCase().includes(goal) || r.category.toLowerCase().includes(goal))) {
        score += 35;
        reasons.push(`Prepares you for your career goal: "${profile.goal}"`);
      }

      // Check skills match
      const matchingSkills = r.requiredSkills.filter(s => userSkills.includes(s.toLowerCase()));
      if (matchingSkills.length > 0) {
        score += Math.min(30, matchingSkills.length * 8);
        reasons.push(`Builds upon ${matchingSkills.length} of your current skills (${matchingSkills.slice(0, 3).join(', ')})`);
      }

      if (score === 0) {
        score = 15;
        reasons.push('Broad industry foundation recommended for college students');
      }

      return {
        ...r,
        matchScore: Math.min(100, score),
        recommendationReason: reasons.join('. ') + '.',
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);

    // 2. Recommended Opportunities with Explanations
    const allOpportunities = await Opportunity.find().lean();
    const recommendedOpportunities = allOpportunities.map(opp => {
      const oppSkills = (opp.skills || []).map(s => s.toLowerCase());
      const matched = oppSkills.filter(s => userSkills.includes(s));
      const missing = oppSkills.filter(s => !userSkills.includes(s));
      const matchScore = oppSkills.length > 0 ? Math.round((matched.length / oppSkills.length) * 100) : 50;

      let reason = '';
      if (matchScore >= 70) {
        reason = `Strong match! You already possess ${matched.length}/${oppSkills.length} required skills.`;
      } else if (matchScore >= 40) {
        reason = `Moderate match. Learn ${missing.slice(0, 2).join(', ')} to boost your readiness.`;
      } else {
        reason = `Growth opportunity in ${opp.category}. Great stepping stone to build new capabilities.`;
      }

      return {
        ...opp,
        matchScore,
        matchedSkills: matched,
        missingSkills: missing,
        recommendationReason: reason,
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);

    // 3. Recommended Learning Resources for Skill Gaps
    const topMissingSkills = recommendedOpportunities[0]?.missingSkills || ['Node.js', 'Docker', 'SQL'];
    const recommendedResources = await LearningResource.find({
      technology: { $in: topMissingSkills.map(s => new RegExp(s, 'i')) }
    }).limit(6).lean();

    res.json({
      userProfile: {
        goal: profile.goal || 'Software Engineer',
        domain: profile.selectedDomain?.name || profile.selectedDomain || 'Web Development',
        skillsCount: userSkills.length,
      },
      recommendedRoadmaps,
      recommendedOpportunities,
      recommendedResources,
    });
  } catch (err) {
    console.error('Recommendations Error:', err);
    res.status(500).json({ message: 'Failed to generate personalized recommendations' });
  }
});

module.exports = router;
