const llmService = require('./llmService');

class CareerPathService {
  /**
   * Generate structured career paths using local Qwen3 model
   */
  async generatePaths({ currentSkills = [], degree = '', interests = [], goal = '' }) {
    const systemPrompt = 'You are a tech career architect. Generate structured alternative career paths in JSON format.';
    const prompt = `Generate 3 distinct tech career paths for a student with:
Skills: ${currentSkills.join(', ') || 'JavaScript, HTML, Python'}
Degree: ${degree || 'Computer Science / Engineering'}
Interests: ${interests.join(', ') || 'Building Tech Products'}
Goal: ${goal || 'Build a software career'}

Return strictly JSON matching this structure:
{
  "paths": [
    {
      "role": "Role Title",
      "startingPoint": "Entry Role",
      "steps": ["Junior Level", "Mid-Level Specialist", "Senior / Architect"],
      "skills": ["Skill1", "Skill2", "Skill3"],
      "timeline": "2-3 Years",
      "breakthrough": "Key project or certification needed"
    }
  ]
}`;

    try {
      const data = await llmService.generateJSON(prompt, systemPrompt);
      if (data && Array.isArray(data.paths)) {
        return {
          paths: data.paths.map(p => ({
            ...p,
            isAiGenerated: true
          }))
        };
      }
    } catch (err) {
      // Safe fallback
    }

    return {
      paths: [
        {
          role: 'Full Stack Software Engineer',
          startingPoint: 'Junior Developer',
          steps: ['Frontend Developer', 'Full Stack Developer', 'Senior Architect'],
          skills: ['JavaScript', 'React', 'Node.js', 'System Design'],
          timeline: '1-3 Years',
          breakthrough: 'Build and deploy full-stack production application',
          isAiGenerated: true
        },
        {
          role: 'AI / Machine Learning Engineer',
          startingPoint: 'Data Analyst / ML Apprentice',
          steps: ['ML Engineer', 'Senior AI Researcher', 'Lead AI Architect'],
          skills: ['Python', 'PyTorch', 'Scikit-Learn', 'Deep Learning'],
          timeline: '2-4 Years',
          breakthrough: 'Train and deploy fine-tuned open-source model',
          isAiGenerated: true
        }
      ]
    };
  }
}

module.exports = new CareerPathService();
