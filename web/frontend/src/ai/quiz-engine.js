import domains from '../data/domains';

const domainReasons = {
  webdev: 'You enjoy building things people interact with visually, love JavaScript, and want to create products used by millions on the web. Web Development is the perfect match for your creative and practical mindset.',
  aiml: 'You\'re drawn to math, algorithms, and the idea of teaching machines to think. AI/ML lets you work on cutting-edge technology that\'s shaping the future — from chatbots to self-driving cars.',
  datascience: 'You love finding patterns in data and turning numbers into stories. Data Science combines your analytical mind with real business impact — helping companies make smarter decisions.',
  cybersecurity: 'You think like a hacker (the ethical kind!). Your love for logic, puzzles, and systems makes Cybersecurity a natural fit — you\'ll protect the digital world from threats.',
  appdev: 'You want to build apps that live in people\'s pockets. Your interest in mobile technology and user experience makes App Development the ideal path to creating impactful products.',
  cloud: 'You are fascinated by infrastructure, scale, and automation. Cloud & DevOps allows you to be the architect behind the scenes, ensuring systems are reliable, secure, and lightning-fast.',
  gamedev: 'You are imaginative and love interactive storytelling. Game Development bridges your logical programming skills with creative world-building to create immersive experiences.',
  blockchain: 'You believe in decentralization and the future of the web. Blockchain & Web3 lets you work on cutting-edge cryptographic systems, smart contracts, and new financial paradigms.',
  uiux: 'You are deeply empathetic and visually driven. UI/UX Design allows you to focus purely on the human element of software, creating beautiful, accessible, and intuitive experiences.'
};

export function calculateQuizResult(answers) {
  const scores = { webdev: 0, aiml: 0, datascience: 0, cybersecurity: 0, appdev: 0, cloud: 0, gamedev: 0, blockchain: 0, uiux: 0 };

  answers.forEach((answer) => {
    if (answer && answer.scores) {
      Object.entries(answer.scores).forEach(([domain, score]) => {
        scores[domain] = (scores[domain] || 0) + score;
      });
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topDomainId = sorted[0][0];
  const topScore = sorted[0][1];
  const maxPossible = 24; // rough max
  const confidence = Math.min(Math.round((topScore / maxPossible) * 100), 98);

  const topDomain = domains.find((d) => d.id === topDomainId);

  return {
    domain: topDomain,
    confidence,
    reason: domainReasons[topDomainId],
    allScores: sorted.map(([id, score]) => ({
      domain: domains.find((d) => d.id === id),
      score,
      percentage: Math.round((score / topScore) * 100) || 0,
    })),
  };
}
