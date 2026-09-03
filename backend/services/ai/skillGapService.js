const embeddingService = require('./embeddingService');
const llmService = require('./llmService');

class SkillGapService {
  /**
   * Deterministic & Semantic Skill Gap Analysis using BGE-M3 vector embeddings + Qwen natural language explanation
   */
  async analyzeGap({ userSkills = [], targetRoleSkills = [], roleTitle = 'Software Engineer' }) {
    if (!Array.isArray(userSkills)) userSkills = [];
    if (!Array.isArray(targetRoleSkills)) targetRoleSkills = [];

    const userLower = userSkills.map(s => String(s).toLowerCase().trim());

    // 1. Deterministic Match & Missing Categorization
    const matchedSkills = targetRoleSkills.filter(reqSkill =>
      userLower.includes(String(reqSkill).toLowerCase().trim())
    );

    const missingSkills = targetRoleSkills.filter(reqSkill =>
      !userLower.includes(String(reqSkill).toLowerCase().trim())
    );

    // 2. Semantic BGE-M3 Embedding Match Score
    const matchScore = await embeddingService.calculateSemanticMatch(userSkills, targetRoleSkills);

    // 3. Qwen Natural Language Explanation (if model server online)
    let explanation = '';
    let recommendations = missingSkills.slice(0, 4);

    try {
      const health = await llmService.checkServerHealth();
      if (health.isAvailable && missingSkills.length > 0) {
        const prompt = `Analyze the skill gap for a student aiming for "${roleTitle}".
Current Skills: ${userSkills.join(', ') || 'Basic programming'}
Missing Target Skills: ${missingSkills.join(', ')}

Provide a concise 2-sentence actionable advice on what they should learn first and why.`;
        
        explanation = await llmService.generateText(prompt, 'You are a technical career mentor.');
      }
    } catch {
      // Keep silent on explanation fallback
    }

    if (!explanation) {
      if (matchScore >= 75) {
        explanation = `Great job! You possess ${matchedSkills.length} of ${targetRoleSkills.length} core skills for ${roleTitle}.`;
      } else if (matchScore >= 40) {
        explanation = `Solid baseline. Focus on mastering ${missingSkills.slice(0, 2).join(' and ')} to become competitive.`;
      } else {
        explanation = `Start by learning fundamental beginner skills: ${missingSkills.slice(0, 3).join(', ')}.`;
      }
    }

    return {
      roleTitle,
      matchScore,
      matchedSkills,
      missingSkills,
      recommendations,
      explanation,
      totalRequiredCount: targetRoleSkills.length,
      matchedCount: matchedSkills.length
    };
  }
}

module.exports = new SkillGapService();
