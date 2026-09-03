const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const llmService = require('../services/ai/llmService');
const roadmapService = require('../services/ai/roadmapService');
const skillGapService = require('../services/ai/skillGapService');
const jobMatchingService = require('../services/ai/jobMatchingService');
const careerPathService = require('../services/ai/careerPathService');
const resumeService = require('../services/ai/resumeService');

// Health Check for Local AI Model Server (Ollama / Qwen / BGE-M3)
router.get('/status', async (req, res) => {
  const health = await llmService.checkServerHealth();
  res.json({
    status: health.isAvailable ? 'online' : 'offline',
    provider: 'Local Open-Source AI Server (Ollama)',
    llmModel: process.env.LLM_MODEL || 'qwen3:8b',
    embeddingModel: process.env.EMBEDDING_MODEL || 'bge-m3',
    ...health
  });
});

const Roadmap = require('../models/Roadmap');

// Generate AI Roadmap
router.post('/generate-roadmap', auth, async (req, res) => {
  try {
    const { degree, year, skills, interests, goal, selectedDomain } = req.body;
    const result = await roadmapService.generateRoadmap({ degree, year, skills, interests, goal, selectedDomain });
    
    // Automatically save generated roadmap to MongoDB for req.user
    let roadmap = await Roadmap.findOne({ user: req.user });
    if (roadmap) {
      roadmap.roadmapData = result;
    } else {
      roadmap = new Roadmap({ user: req.user, roadmapData: result });
    }
    await roadmap.save();

    res.json(result);
  } catch (err) {
    console.error('AI Roadmap Generation Error:', err.message);
    res.status(503).json({
      message: 'AI service is temporarily unavailable. Please start the local AI service (Ollama) and try again.',
      error: err.message
    });
  }
});


// Analyze Skill Gap
router.post('/skill-gap', auth, async (req, res) => {
  try {
    const { userSkills, targetRoleSkills, roleTitle } = req.body;
    const result = await skillGapService.analyzeGap({ userSkills, targetRoleSkills, roleTitle });
    res.json(result);
  } catch (err) {
    console.error('Skill Gap Analysis Error:', err.message);
    res.status(500).json({ message: 'Unable to analyze skill gap.', error: err.message });
  }
});

// Job Match Score
router.post('/job-match', auth, async (req, res) => {
  try {
    const { userSkills, degree, year, jobTitle, jobRequiredSkills, jobDescription } = req.body;
    const result = await jobMatchingService.matchJob({ userSkills, degree, year, jobTitle, jobRequiredSkills, jobDescription });
    res.json(result);
  } catch (err) {
    console.error('Job Matching Error:', err.message);
    res.status(500).json({ message: 'Unable to calculate job match.', error: err.message });
  }
});

// Career Path Generator
router.post('/career-paths', auth, async (req, res) => {
  try {
    const { currentSkills, degree, interests, goal } = req.body;
    const result = await careerPathService.generatePaths({ currentSkills, degree, interests, goal });
    res.json(result);
  } catch (err) {
    console.error('Career Path Generator Error:', err.message);
    res.status(500).json({ message: 'Unable to generate career paths.', error: err.message });
  }
});

// Analyze Resume
router.post('/analyze-resume', auth, async (req, res) => {
  try {
    const { rawText, filename } = req.body;
    const result = await resumeService.analyzeResumeText(rawText || '', filename || 'resume.pdf');
    res.json(result);
  } catch (err) {
    console.error('Resume Analysis Error:', err.message);
    res.status(500).json({ message: 'Unable to analyze resume text.', error: err.message });
  }
});

module.exports = router;
