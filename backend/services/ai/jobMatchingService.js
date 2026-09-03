const embeddingService = require('./embeddingService');
const llmService = require('./llmService');

class JobMatchingService {
  /**
   * Calculate deterministic job match score using BGE-M3 semantic embeddings
   */
  async matchJob({ userSkills = [], degree = '', year = '', jobTitle = '', jobRequiredSkills = [], jobDescription = '' }) {
    if (!Array.isArray(userSkills)) userSkills = [];
    if (!Array.isArray(jobRequiredSkills)) jobRequiredSkills = [];

    // Semantic Skill Compatibility (BGE-M3)
    const skillScore = await embeddingService.calculateSemanticMatch(userSkills, jobRequiredSkills);

    // Title / Description semantic similarity
    let titleScore = 50;
    if (jobTitle && userSkills.length > 0) {
      const titleVec = await embeddingService.getEmbedding(jobTitle);
      const userVec = await embeddingService.getEmbedding(userSkills.join(' '));
      const sim = embeddingService.cosineSimilarity(titleVec, userVec);
      titleScore = Math.round(sim * 100);
    }

    // Weighted final deterministic match score
    const finalScore = Math.min(Math.max(Math.round(skillScore * 0.7 + titleScore * 0.3), 15), 98);

    const userLower = userSkills.map(s => String(s).toLowerCase().trim());
    const matchedSkills = jobRequiredSkills.filter(s => userLower.includes(String(s).toLowerCase().trim()));
    const missingSkills = jobRequiredSkills.filter(s => !userLower.includes(String(s).toLowerCase().trim()));

    // Qwen missing skills explanation (optional)
    let explanation = `Matched ${matchedSkills.length} of ${jobRequiredSkills.length} required skills for ${jobTitle}.`;
    try {
      const health = await llmService.checkServerHealth();
      if (health.isAvailable && missingSkills.length > 0) {
        const prompt = `Job: ${jobTitle}\nMatched Skills: ${matchedSkills.join(', ')}\nMissing: ${missingSkills.join(', ')}\nExplain in 1 short sentence what to focus on.`;
        const aiText = await llmService.generateText(prompt, 'You are an HR technical recruiter.');
        if (aiText) explanation = aiText;
      }
    } catch {}

    return {
      jobTitle,
      matchScore: finalScore,
      matchedSkills,
      missingSkills,
      explanation
    };
  }
}

module.exports = new JobMatchingService();
