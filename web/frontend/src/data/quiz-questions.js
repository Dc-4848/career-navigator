const quizQuestions = [
  {
    id: 1,
    question: 'What excites you the most?',
    options: [
      { text: 'Building beautiful interfaces people use daily', scores: { webdev: 3, appdev: 2, uiux: 2 } },
      { text: 'Teaching a computer to recognize images or speech', scores: { aiml: 3, datascience: 1 } },
      { text: 'Managing servers, automation, and scaling systems', scores: { cloud: 3, cybersecurity: 1 } },
      { text: 'Creating immersive 3D worlds and mechanics', scores: { gamedev: 3 } },
      { text: 'Building decentralized systems and smart contracts', scores: { blockchain: 3 } },
    ],
  },
  {
    id: 2,
    question: 'How do you feel about math and statistics?',
    options: [
      { text: 'I love it — probability, linear algebra, calculus', scores: { aiml: 3, datascience: 3, gamedev: 2 } },
      { text: 'I\'m okay with basic math when needed', scores: { webdev: 1, appdev: 1, cybersecurity: 1, blockchain: 1 } },
      { text: 'I prefer logic and problem-solving over formulas', scores: { cloud: 2, cybersecurity: 2, webdev: 1 } },
      { text: 'I prefer to focus entirely on visual design', scores: { uiux: 3 } },
    ],
  },
  {
    id: 3,
    question: 'Which of these sounds like a fun weekend project?',
    options: [
      { text: 'Designing a clickable prototype for a new app idea', scores: { uiux: 3, webdev: 1 } },
      { text: 'Training a model to classify movie reviews', scores: { aiml: 3, datascience: 1 } },
      { text: 'Setting up a home lab or automating my smart home', scores: { cloud: 3, cybersecurity: 2 } },
      { text: 'Minting my own custom crypto token', scores: { blockchain: 3 } },
      { text: 'Building a simple 2D platformer game', scores: { gamedev: 3 } },
    ],
  },
  {
    id: 4,
    question: 'What kind of problems do you enjoy solving?',
    options: [
      { text: 'Making sure a website looks perfect on every screen size', scores: { webdev: 3, uiux: 2, appdev: 1 } },
      { text: 'Finding out why a server crashed and fixing it', scores: { cloud: 3, cybersecurity: 2 } },
      { text: 'Figuring out how to encrypt or protect sensitive data', scores: { cybersecurity: 3, blockchain: 2 } },
      { text: 'Optimizing a rendering loop to hit 60 FPS', scores: { gamedev: 3 } },
      { text: 'Finding hidden trends in massive spreadsheets', scores: { datascience: 3 } },
    ],
  },
  {
    id: 5,
    question: 'Which tool or language appeals to you most?',
    options: [
      { text: 'JavaScript / TypeScript / React', scores: { webdev: 3, appdev: 2 } },
      { text: 'Figma / Sketch / Adobe XD', scores: { uiux: 3 } },
      { text: 'Python / SQL / Pandas', scores: { aiml: 2, datascience: 3 } },
      { text: 'Docker / Linux / AWS', scores: { cloud: 3, cybersecurity: 1 } },
      { text: 'Solidity / Rust / Web3.js', scores: { blockchain: 3 } },
      { text: 'C# / C++ / Unity / Unreal', scores: { gamedev: 3 } },
    ],
  },
  {
    id: 6,
    question: 'What kind of impact do you want to make?',
    options: [
      { text: 'Ensure digital products are highly accessible and beautiful', scores: { uiux: 3, webdev: 1 } },
      { text: 'Create intelligent systems that automate tasks', scores: { aiml: 3 } },
      { text: 'Ensure global systems never go offline', scores: { cloud: 3 } },
      { text: 'Protect people and organizations from cyber threats', scores: { cybersecurity: 3 } },
      { text: 'Build the next generation of decentralized finance', scores: { blockchain: 3 } },
    ],
  },
  {
    id: 7,
    question: 'How do you prefer to learn?',
    options: [
      { text: 'Sketching, wireframing, and gathering user feedback', scores: { uiux: 3 } },
      { text: 'Studying whitepapers and cryptographic proofs', scores: { blockchain: 3, cybersecurity: 1 } },
      { text: 'Building small projects and seeing instant visual results', scores: { webdev: 2, appdev: 2, gamedev: 2 } },
      { text: 'Deploying servers and breaking things in a terminal', scores: { cloud: 3, cybersecurity: 2 } },
      { text: 'Working with Jupyter notebooks and analyzing data', scores: { datascience: 3, aiml: 2 } },
    ],
  },
  {
    id: 8,
    question: 'Where do you see yourself in 3 years?',
    options: [
      { text: 'Working as a Cloud Architect or DevOps Engineer', scores: { cloud: 3 } },
      { text: 'Designing award-winning user experiences', scores: { uiux: 3 } },
      { text: 'Releasing my own indie game on Steam', scores: { gamedev: 3 } },
      { text: 'Writing secure smart contracts for Web3 startups', scores: { blockchain: 3 } },
      { text: 'Working at a tech company as a Full-Stack Developer', scores: { webdev: 3, appdev: 2 } },
    ],
  },
];

export default quizQuestions;
