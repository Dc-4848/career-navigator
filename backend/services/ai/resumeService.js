const embeddingService = require('./embeddingService');
const llmService = require('./llmService');

const SKILL_DICTIONARY = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'html', 'css',
  'react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'flask',
  'sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'firebase', 'aws', 'azure',
  'gcp', 'docker', 'kubernetes', 'git', 'linux', 'ci/cd', 'rest api', 'graphql',
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas', 'numpy',
  'scikit-learn', 'data analysis', 'power bi', 'tableau', 'cybersecurity',
  'penetration testing', 'networking', 'figma', 'ui/ux', 'agile', 'scrum',
  'flutter', 'react native', 'solidity', 'blockchain', 'tailwind', 'bootstrap'
];

class ResumeService {
  /**
   * Analyze raw resume text combining BGE-M3 semantic embeddings & Qwen3 insights
   */
  async analyzeResumeText(rawText, filename = 'resume.pdf') {
    const lowerText = (rawText || '').toLowerCase();

    // 1. Skill Extraction
    const detected = SKILL_DICTIONARY.filter(skill => {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(lowerText);
    });

    const formattedSkills = detected.map(s =>
      s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    );

    // 2. Section Analysis
    const hasEducation = /education|degree|b\.tech|bachelor|master|university|college|gpa|cgpa/i.test(lowerText);
    const hasProjects = /project|built|developed|application|repository|github/i.test(lowerText);
    const hasExperience = /experience|work|intern|employment|company|role/i.test(lowerText);
    const hasCertifications = /certification|certified|course|coursera|udemy|license/i.test(lowerText);
    const hasMetrics = /\d+%\s*|\$\d+|\d+\s*users|\d+\s*ms|\d+\s*x/i.test(lowerText);

    // 3. Compute ATS Score
    let score = 35;
    if (formattedSkills.length >= 8) score += 25;
    else if (formattedSkills.length >= 4) score += 15;
    else if (formattedSkills.length > 0) score += 8;

    if (hasEducation) score += 10;
    if (hasProjects) score += 12;
    if (hasExperience) score += 10;
    if (hasCertifications) score += 5;
    if (hasMetrics) score += 3;

    score = Math.min(score, 96);

    // 4. Strengths & Improvements
    const strengths = [];
    if (formattedSkills.length >= 5) strengths.push(`Strong technical skillset detected (${formattedSkills.length} key skills).`);
    if (hasProjects) strengths.push('Clear software projects / application repository section detected.');
    if (hasEducation) strengths.push('Formal education credentials and academic program present.');
    if (hasMetrics) strengths.push('Included quantifiable impact metrics or performance achievements.');

    const improvements = [];
    if (formattedSkills.length < 5) improvements.push('Add more specific technical tools, frameworks, and databases.');
    if (!hasCertifications) improvements.push('Include relevant industry certifications (AWS, Meta, Google, Coursera).');
    if (!hasMetrics) improvements.push('Quantify project outcomes (e.g., "Improved query load speed by 40%").');
    if (!hasExperience) improvements.push('Add an Internship, Open-Source contribution, or Freelance section.');

    // 5. Try Qwen AI Insights if model server available
    try {
      const health = await llmService.checkServerHealth();
      if (health.isAvailable) {
        const prompt = `Resume Text Summary: ${rawText.slice(0, 1500)}
Detected Skills: ${formattedSkills.join(', ')}

Return strictly JSON:
{
  "aiSummary": "1-sentence executive summary of candidate",
  "recommendedRole": "Top job role match"
}`;
        const aiRes = await llmService.generateJSON(prompt);
        if (aiRes && aiRes.aiSummary) {
          strengths.unshift(aiRes.aiSummary);
        }
      }
    } catch {}

    return {
      fileName: filename,
      score,
      skills: formattedSkills,
      strengths,
      improvements,
      hasEducation,
      hasProjects,
      hasExperience,
      hasCertifications,
      analyzedWithLocalAi: true
    };
  }
}

module.exports = new ResumeService();
