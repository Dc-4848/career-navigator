const llmService = require('./llmService');
const aiConfig = require('../../config/aiConfig');

class RoadmapService {
  /**
   * Generate 12-Week AI Roadmap for student profile using local Qwen3 model
   */
  async generateRoadmap({ degree, year, skills = [], interests = [], goal = '', selectedDomain = 'Web Development' }) {
    const systemPrompt = 'You are an elite Indian Tech Career Strategist. Generate structured 12-week learning roadmaps in minified JSON format.';
    
    const userPrompt = `Generate a 12-week learning roadmap for a student with:
- Program/Degree: ${degree || 'B.Tech / B.E.'}
- Year: ${year || '3rd Year'}
- Current Skills: ${skills.join(', ') || 'HTML, CSS, JavaScript'}
- Interests: ${interests.join(', ') || 'Building Applications'}
- Target Career Domain: ${selectedDomain}
- Career Goal: ${goal || 'Land a software engineer job/internship'}

Respond ONLY with a JSON object matching this EXACT structure:
{
  "title": "${selectedDomain} 12-Week Mastery Roadmap",
  "description": "Customized learning path built for ${degree || 'Student'} (${year || 'Current Year'}) to reach your goal.",
  "weeks": [
    {
      "week": 1,
      "title": "Week Title",
      "topics": ["Topic 1", "Topic 2", "Topic 3"],
      "resource": "Recommended learning resource name",
      "project": "Hands-on milestone project to build",
      "time": "10-12 hours"
    }
  ]
}
Generate exactly 12 weeks numbered 1 to 12.
`;

    try {
      const data = await llmService.generateJSON(userPrompt, systemPrompt);
      
      // Validate structure
      if (!data || !Array.isArray(data.weeks) || data.weeks.length === 0) {
        throw new Error('LLM output missing valid weeks array');
      }

      // Ensure controlled resource URLs (no fake LLM links)
      data.weeks = data.weeks.map(w => {
        let matchedResource = aiConfig.verifiedResources['JavaScript'];
        const titleLower = (w.title + ' ' + (w.topics || []).join(' ')).toLowerCase();
        
        for (const [key, resObj] of Object.entries(aiConfig.verifiedResources)) {
          if (titleLower.includes(key.toLowerCase())) {
            matchedResource = resObj;
            break;
          }
        }

        return {
          week: w.week,
          title: w.title || `Week ${w.week} Milestones`,
          topics: Array.isArray(w.topics) ? w.topics : ['Core Concepts', 'Practice Labs'],
          resource: matchedResource.name,
          resourceUrl: matchedResource.url,
          project: w.project || 'Build a portfolio feature',
          time: w.time || '10-12 hrs/week'
        };
      });

      return {
        domainId: String(selectedDomain).toLowerCase().replace(/[^a-z0-9]/g, ''),
        title: data.title || `${selectedDomain} 12-Week Roadmap`,
        description: data.description || 'Personalized AI-generated learning plan.',
        weeks: data.weeks.slice(0, 12),
        isAiGenerated: true,
        generatedAt: new Date().toISOString()
      };
    } catch (err) {
      // Fallback deterministic generator if local AI server is offline
      return this.getFallbackRoadmap(selectedDomain, degree, year);
    }
  }

  getFallbackRoadmap(selectedDomain, degree, year) {
    const weeks = [];
    for (let i = 1; i <= 12; i++) {
      weeks.push({
        week: i,
        title: `Week ${i}: Core ${selectedDomain} Module ${i}`,
        topics: [`Fundamental Principle ${i}.1`, `Practical Application ${i}.2`, `Best Practices`],
        resource: 'MDN / Official Documentation Guides',
        resourceUrl: 'https://developer.mozilla.org',
        project: `Week ${i} Milestone Application Feature`,
        time: '10 hrs/week'
      });
    }

    return {
      domainId: String(selectedDomain).toLowerCase().replace(/[^a-z0-9]/g, ''),
      title: `${selectedDomain} 12-Week Roadmap`,
      description: `Structured learning roadmap for ${degree || 'Student'} (${year || 'Current Year'}).`,
      weeks,
      isAiGenerated: false,
      note: 'Generated using default structured syllabus.'
    };
  }
}

module.exports = new RoadmapService();
