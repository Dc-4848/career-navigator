const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  aiBaseUrl: process.env.AI_BASE_URL || 'http://localhost:11434',
  llmModel: process.env.LLM_MODEL || 'qwen3:8b',
  embeddingModel: process.env.EMBEDDING_MODEL || 'bge-m3',
  timeoutMs: parseInt(process.env.AI_TIMEOUT_MS, 10) || 20000,
  
  // Controlled verified resource dataset (prevents LLM URL hallucination)
  verifiedResources: {
    'HTML/CSS': { name: 'MDN Web Docs - HTML & CSS', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
    'JavaScript': { name: 'JavaScript.info Guide', url: 'https://javascript.info' },
    'React': { name: 'Official React Documentation', url: 'https://react.dev' },
    'Node.js': { name: 'Node.js Official Guides', url: 'https://nodejs.org/en/docs/guides' },
    'Python': { name: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/' },
    'SQL': { name: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/' },
    'Git': { name: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2' },
    'Docker': { name: 'Docker Docs & Getting Started', url: 'https://docs.docker.com/get-started/' },
    'Data Structures & Algorithms': { name: 'GeeksforGeeks DSA Course', url: 'https://www.geeksforgeeks.org/data-structures/' },
    'Machine Learning': { name: 'Scikit-Learn Tutorials', url: 'https://scikit-learn.org/stable/tutorial/index.html' },
    'Deep Learning': { name: 'Fast.ai Practical Deep Learning', url: 'https://www.fast.ai' },
    'Cybersecurity': { name: 'OWASP Top 10 Web Security', url: 'https://owasp.org/www-project-top-ten/' },
    'Cloud Computing': { name: 'AWS Cloud Essentials', url: 'https://aws.amazon.com/getting-started/' },
    'UI/UX Design': { name: 'Figma Learn & Design Basics', url: 'https://help.figma.com/hc/en-us' }
  }
};
