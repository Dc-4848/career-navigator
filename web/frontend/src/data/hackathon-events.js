const hackathonEvents = {
  webdev: [
    {
      id: 'wh1',
      name: 'Global Web Builders Hack',
      theme: 'Accessibility & Future Web',
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
      difficulty: 'Beginner',
      prize: '$10,000'
    },
    {
      id: 'wh2',
      name: 'Hack The Stack',
      theme: 'Full Stack Open Source',
      requiredSkills: ['React', 'Node.js', 'Databases', 'REST APIs'],
      difficulty: 'Advanced',
      prize: '$25,000'
    },
    {
      id: 'wh3',
      name: 'Responsive Web Showdown',
      theme: 'Mobile-First Accessibility Solutions',
      requiredSkills: ['HTML', 'CSS', 'JavaScript'],
      difficulty: 'Beginner',
      prize: '$5,000'
    },
    {
      id: 'wh4',
      name: 'NextGen Frameworks Hackathon',
      theme: 'Server Component Performance Optimization',
      requiredSkills: ['React', 'TypeScript', 'Node.js'],
      difficulty: 'Advanced',
      prize: '$20,000'
    }
  ],
  aiml: [
    {
      id: 'ah1',
      name: 'GenAI Innovators Challenge',
      theme: 'Generative AI & LLMs',
      requiredSkills: ['Python', 'Deep Learning', 'NLP'],
      difficulty: 'Advanced',
      prize: '$30,000'
    },
    {
      id: 'ah2',
      name: 'Computer Vision Hack',
      theme: 'Image Recognition Solutions',
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch'],
      difficulty: 'Intermediate',
      prize: '$15,000'
    },
    {
      id: 'ah3',
      name: 'AI for Sustainability',
      theme: 'Eco-friendly Analytics & Optimization Models',
      requiredSkills: ['Python', 'Math/Statistics', 'Pandas'],
      difficulty: 'Intermediate',
      prize: '$18,000'
    },
    {
      id: 'ah4',
      name: 'NLP Chatbot Olympics',
      theme: 'Zero-Shot Classification and Conversational Agents',
      requiredSkills: ['Python', 'NLP', 'TensorFlow'],
      difficulty: 'Advanced',
      prize: '$22,000'
    }
  ],
  datascience: [
    {
      id: 'dh1',
      name: 'Data For Good',
      theme: 'Social Impact Data Analysis',
      requiredSkills: ['SQL', 'Python', 'Pandas', 'Data Visualization'],
      difficulty: 'Beginner',
      prize: '$5,000'
    },
    {
      id: 'dh2',
      name: 'Predictive Modeling Jam',
      theme: 'Forecasting Climate Change',
      requiredSkills: ['Machine Learning', 'Statistics', 'Python'],
      difficulty: 'Intermediate',
      prize: '$12,000'
    },
    {
      id: 'dh3',
      name: 'Financial Analytics Challenge',
      theme: 'Stock Trend Forecasting & Sentiment Analysis',
      requiredSkills: ['Python', 'SQL', 'Statistics'],
      difficulty: 'Intermediate',
      prize: '$15,000'
    },
    {
      id: 'dh4',
      name: 'Big Data Wrangling Sprint',
      theme: 'Massive Dataset Processing & Cleaning',
      requiredSkills: ['Python', 'SQL', 'Big Data'],
      difficulty: 'Advanced',
      prize: '$20,000'
    }
  ],
  cybersecurity: [
    {
      id: 'ch1',
      name: 'Defcon CTF Qualifiers',
      theme: 'Capture The Flag',
      requiredSkills: ['Linux', 'Ethical Hacking', 'Cryptography'],
      difficulty: 'Advanced',
      prize: '$50,000'
    },
    {
      id: 'ch2',
      name: 'SecureNet Hackathon',
      theme: 'Web Application Security',
      requiredSkills: ['OWASP', 'Networking', 'Python'],
      difficulty: 'Intermediate',
      prize: '$10,000'
    },
    {
      id: 'ch3',
      name: 'IoT Pen Testing Arena',
      theme: 'Reverse Engineering Smart Home Devices',
      requiredSkills: ['Linux', 'Networking', 'Ethical Hacking'],
      difficulty: 'Advanced',
      prize: '$35,000'
    },
    {
      id: 'ch4',
      name: 'Junior Defender Hack',
      theme: 'Securing Small Business Networks',
      requiredSkills: ['Networking Basics', 'Linux', 'Python'],
      difficulty: 'Beginner',
      prize: '$6,000'
    }
  ],
  appdev: [
    {
      id: 'ad1',
      name: 'Apptoberfest',
      theme: 'Cross-platform Mobile Apps',
      requiredSkills: ['React Native', 'Flutter', 'Firebase'],
      difficulty: 'Intermediate',
      prize: '$15,000'
    },
    {
      id: 'ad2',
      name: 'Swift Student Challenge',
      theme: 'Innovative iOS Experiences',
      requiredSkills: ['Swift', 'UI Design Basics'],
      difficulty: 'Beginner',
      prize: 'Apple Gear'
    },
    {
      id: 'ad3',
      name: 'Kotlin Android Masterclass',
      theme: 'Native Jetpack Compose Applications',
      requiredSkills: ['Kotlin', 'Firebase', 'REST APIs'],
      difficulty: 'Intermediate',
      prize: '$12,000'
    },
    {
      id: 'ad4',
      name: 'Cross-Platform Speed Run',
      theme: 'Utility Apps in Flutter or React Native',
      requiredSkills: ['JavaScript', 'React Native', 'Flutter'],
      difficulty: 'Intermediate',
      prize: '$10,000'
    }
  ],
  cloud: [
    {
      id: 'cd1',
      name: 'AWS Serverless Hack',
      theme: 'Serverless Architecture',
      requiredSkills: ['AWS', 'Python', 'Docker'],
      difficulty: 'Intermediate',
      prize: '$20,000'
    },
    {
      id: 'cd2',
      name: 'KubeCon Cloud Native Hack',
      theme: 'Container Orchestration',
      requiredSkills: ['Kubernetes', 'Linux', 'CI/CD'],
      difficulty: 'Advanced',
      prize: '$25,000'
    },
    {
      id: 'cd3',
      name: 'Terraform IaC Sprint',
      theme: 'Automated Multi-Region Server Provisioning',
      requiredSkills: ['Terraform', 'AWS', 'Linux'],
      difficulty: 'Advanced',
      prize: '$15,000'
    },
    {
      id: 'cd4',
      name: 'Dockerize Everything',
      theme: 'Microservice Containerization & Network Linkage',
      requiredSkills: ['Docker', 'Linux', 'CI/CD'],
      difficulty: 'Intermediate',
      prize: '$10,000'
    }
  ],
  gamedev: [
    {
      id: 'gd1',
      name: 'Global Game Jam',
      theme: 'Create a game in 48 hours',
      requiredSkills: ['C#', 'Unity', 'Game Design Basics'],
      difficulty: 'Beginner',
      prize: 'Mentorship'
    },
    {
      id: 'gd2',
      name: 'Unreal Epic MegaJam',
      theme: 'High Fidelity 3D Worlds',
      requiredSkills: ['C++', 'Unreal Engine', '3D Math'],
      difficulty: 'Advanced',
      prize: '$30,000'
    },
    {
      id: 'gd3',
      name: 'Unity 2D Retro Jam',
      theme: 'Classic arcade games re-imagined',
      requiredSkills: ['C#', 'Unity', 'Game Design Basics'],
      difficulty: 'Beginner',
      prize: '$3,500'
    },
    {
      id: 'gd4',
      name: 'VFX & Shader Showdown',
      theme: 'Atmospheric rendering in custom game engines',
      requiredSkills: ['C++', 'Graphics Programming', '3D Math'],
      difficulty: 'Advanced',
      prize: '$20,000'
    }
  ],
  blockchain: [
    {
      id: 'bc1',
      name: 'ETHGlobal Hackathon',
      theme: 'Decentralized Finance (DeFi)',
      requiredSkills: ['Solidity', 'Ethereum', 'Web3.js'],
      difficulty: 'Advanced',
      prize: '$50,000'
    },
    {
      id: 'bc2',
      name: 'Web3 Onboarding Jam',
      theme: 'User-friendly dApps',
      requiredSkills: ['JavaScript', 'React', 'Smart Contracts'],
      difficulty: 'Intermediate',
      prize: '$15,000'
    },
    {
      id: 'bc3',
      name: 'Solidity Auditing Sprint',
      theme: 'Finding vulnerabilities in mock DeFi contracts',
      requiredSkills: ['Solidity', 'Smart Contracts', 'Cryptography'],
      difficulty: 'Advanced',
      prize: '$30,000'
    },
    {
      id: 'bc4',
      name: 'Solana dApp Sprint',
      theme: 'Decentralized messaging apps using Rust/Solana',
      requiredSkills: ['Rust', 'Web3.js', 'Blockchain Concepts'],
      difficulty: 'Advanced',
      prize: '$25,000'
    }
  ],
  uiux: [
    {
      id: 'ux1',
      name: 'Designathon 2024',
      theme: 'Accessible Digital Products',
      requiredSkills: ['Figma', 'Wireframing', 'Color Theory'],
      difficulty: 'Beginner',
      prize: '$5,000'
    },
    {
      id: 'ux2',
      name: 'Future of Interfaces',
      theme: 'AR/VR & Micro-interactions',
      requiredSkills: ['Interactive Prototyping', 'User Research', 'Design Systems'],
      difficulty: 'Advanced',
      prize: '$10,000'
    },
    {
      id: 'ux3',
      name: 'Fintech UI Redesign',
      theme: 'Simplifying wealth management for novices',
      requiredSkills: ['Figma', 'Wireframing', 'Color Theory'],
      difficulty: 'Intermediate',
      prize: '$8,000'
    },
    {
      id: 'ux4',
      name: 'Dashboard Usability Sprint',
      theme: 'Optimizing B2B software data representation',
      requiredSkills: ['Figma', 'Interactive Prototyping', 'User Research'],
      difficulty: 'Advanced',
      prize: '$12,000'
    }
  ]
};

export default hackathonEvents;
