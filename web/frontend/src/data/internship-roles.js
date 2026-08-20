const internshipRoles = {
  webdev: [
    {
      id: 'wd1',
      title: 'Frontend Developer Intern',
      description: 'Build user interfaces and implement responsive designs for web applications.',
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
      level: 'Beginner'
    },
    {
      id: 'wd2',
      title: 'Backend Developer Intern',
      description: 'Design and manage APIs, servers, and database architecture.',
      requiredSkills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
      level: 'Intermediate'
    },
    {
      id: 'wd3',
      title: 'Full Stack Developer Intern',
      description: 'Work across the entire stack to deliver end-to-end features.',
      requiredSkills: ['React', 'Node.js', 'TypeScript', 'Databases'],
      level: 'Advanced'
    },
    {
      id: 'wd4',
      title: 'UI Developer Intern',
      description: 'Focus heavily on creating pixel-perfect, accessible UI components.',
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      level: 'Beginner'
    },
    {
      id: 'wd5',
      title: 'React Developer Intern',
      description: 'Build scalable web frontends, interactive layouts, and UI dashboards using React.',
      requiredSkills: ['React', 'JavaScript', 'CSS', 'Git'],
      level: 'Intermediate'
    },
    {
      id: 'wd6',
      title: 'Solutions Architect Intern',
      description: 'Design cloud-native web architectures, serverless workflows, and infrastructure blueprints.',
      requiredSkills: ['Node.js', 'AWS', 'System Design', 'Databases'],
      level: 'Advanced'
    }
  ],
  aiml: [
    {
      id: 'ai1',
      title: 'Machine Learning Intern',
      description: 'Assist in building and training predictive models on structured data.',
      requiredSkills: ['Python', 'Pandas', 'Scikit-learn', 'Math/Statistics'],
      level: 'Intermediate'
    },
    {
      id: 'ai2',
      title: 'Data Analyst Intern',
      description: 'Clean data, run queries, and build basic visualizations.',
      requiredSkills: ['Python', 'SQL', 'Excel', 'Data Visualization'],
      level: 'Beginner'
    },
    {
      id: 'ai3',
      title: 'Computer Vision Intern',
      description: 'Work on image processing pipelines and deep learning models.',
      requiredSkills: ['Python', 'PyTorch', 'TensorFlow', 'Deep Learning'],
      level: 'Advanced'
    },
    {
      id: 'ai4',
      title: 'NLP Engineer Intern',
      description: 'Help develop chatbots, text classifiers, or semantic search tools.',
      requiredSkills: ['Python', 'NLP', 'TensorFlow', 'Math/Statistics'],
      level: 'Advanced'
    },
    {
      id: 'ai5',
      title: 'Deep Learning Research Intern',
      description: 'Conduct advanced research on deep neural network architectures and multi-modal models.',
      requiredSkills: ['Python', 'PyTorch', 'TensorFlow', 'Math/Statistics'],
      level: 'Advanced'
    },
    {
      id: 'ai6',
      title: 'AI Product Intern',
      description: 'Bridge the gap between AI engineering and user experience by building LLM prompt systems.',
      requiredSkills: ['Python', 'NLP', 'Figma', 'UI Design Basics'],
      level: 'Intermediate'
    }
  ],
  datascience: [
    {
      id: 'ds1',
      title: 'Data Analyst Intern',
      description: 'Analyze datasets to extract actionable business insights.',
      requiredSkills: ['SQL', 'Python', 'Excel', 'Statistics'],
      level: 'Beginner'
    },
    {
      id: 'ds2',
      title: 'Data Science Intern',
      description: 'Develop statistical models to predict trends and behaviors.',
      requiredSkills: ['Python', 'Pandas', 'Machine Learning', 'Matplotlib'],
      level: 'Intermediate'
    },
    {
      id: 'ds3',
      title: 'Business Intelligence Intern',
      description: 'Create automated dashboards for executive reporting.',
      requiredSkills: ['SQL', 'Power BI', 'Excel', 'Data Cleaning'],
      level: 'Beginner'
    },
    {
      id: 'ds4',
      title: 'Data Engineering Intern',
      description: 'Build and maintain ETL pipelines for large-scale data.',
      requiredSkills: ['Python', 'SQL', 'Big Data', 'Cloud'],
      level: 'Advanced'
    },
    {
      id: 'ds5',
      title: 'Quantitative Analyst Intern',
      description: 'Develop and test mathematical models for algorithmic trading and risk analytics.',
      requiredSkills: ['Python', 'Statistics', 'SQL', 'Math/Statistics'],
      level: 'Advanced'
    },
    {
      id: 'ds6',
      title: 'Data Storyteller Intern',
      description: 'Translate complex business datasets into clear visualizations and interactive infographics.',
      requiredSkills: ['SQL', 'Power BI', 'Excel', 'Data Visualization'],
      level: 'Beginner'
    }
  ],
  cybersecurity: [
    {
      id: 'cs1',
      title: 'Security Analyst Intern',
      description: 'Monitor network traffic for security events and analyze logs.',
      requiredSkills: ['Networking Basics', 'Linux', 'Python'],
      level: 'Beginner'
    },
    {
      id: 'cs2',
      title: 'Penetration Tester Intern',
      description: 'Conduct vulnerability assessments and ethical hacking on web apps.',
      requiredSkills: ['Ethical Hacking', 'OWASP', 'Linux', 'Networking'],
      level: 'Intermediate'
    },
    {
      id: 'cs3',
      title: 'SOC Analyst Intern',
      description: 'Work in a Security Operations Center triaging security alerts.',
      requiredSkills: ['Networking', 'Log Analysis', 'Linux'],
      level: 'Intermediate'
    },
    {
      id: 'cs4',
      title: 'Cloud Security Intern',
      description: 'Help secure infrastructure hosted on AWS, Azure, or GCP.',
      requiredSkills: ['Cloud Security', 'Networking', 'Python', 'Linux'],
      level: 'Advanced'
    },
    {
      id: 'cs5',
      title: 'Application Security Intern',
      description: 'Audit application codebases, run automated static analysis, and secure web endpoints.',
      requiredSkills: ['OWASP', 'Linux', 'JavaScript', 'REST APIs'],
      level: 'Intermediate'
    },
    {
      id: 'cs6',
      title: 'Cryptanalysis Intern',
      description: 'Implement cryptographic algorithms and analyze security protocols for potential leakage.',
      requiredSkills: ['Cryptography', 'Math/Statistics', 'Python'],
      level: 'Advanced'
    }
  ],
  appdev: [
    {
      id: 'ad1',
      title: 'Mobile App Developer Intern',
      description: 'Assist in building cross-platform mobile applications.',
      requiredSkills: ['JavaScript', 'React Native', 'UI Design Basics'],
      level: 'Beginner'
    },
    {
      id: 'ad2',
      title: 'Flutter Developer Intern',
      description: 'Develop highly performant apps using Dart and the Flutter framework.',
      requiredSkills: ['Dart', 'Flutter', 'REST APIs'],
      level: 'Intermediate'
    },
    {
      id: 'ad3',
      title: 'iOS Developer Intern',
      description: 'Build native applications for the Apple ecosystem.',
      requiredSkills: ['Swift', 'UI Design Basics', 'REST APIs'],
      level: 'Intermediate'
    },
    {
      id: 'ad4',
      title: 'Android Developer Intern',
      description: 'Build native applications for the Android ecosystem.',
      requiredSkills: ['Kotlin', 'Firebase', 'REST APIs'],
      level: 'Intermediate'
    },
    {
      id: 'ad5',
      title: 'React Native Intern',
      description: 'Build and deploy smooth cross-platform mobile features for iOS and Android.',
      requiredSkills: ['JavaScript', 'React Native', 'Firebase', 'Git'],
      level: 'Intermediate'
    },
    {
      id: 'ad6',
      title: 'Native App Optimization Intern',
      description: 'Optimize native app rendering pipelines, battery consumption, and offline syncing behaviors.',
      requiredSkills: ['Kotlin', 'Swift', 'UI Design Basics'],
      level: 'Advanced'
    }
  ],
  cloud: [
    {
      id: 'cl1',
      title: 'Cloud Operations Intern',
      description: 'Assist in managing cloud infrastructure and responding to alerts.',
      requiredSkills: ['Linux', 'Networking Basics', 'AWS'],
      level: 'Beginner'
    },
    {
      id: 'cl2',
      title: 'DevOps Intern',
      description: 'Build CI/CD pipelines and automate deployment processes.',
      requiredSkills: ['Linux', 'Docker', 'CI/CD', 'Python'],
      level: 'Intermediate'
    },
    {
      id: 'cl3',
      title: 'Site Reliability Engineering Intern',
      description: 'Work on ensuring high availability and performance of systems.',
      requiredSkills: ['Python', 'Kubernetes', 'AWS', 'Terraform'],
      level: 'Advanced'
    },
    {
      id: 'cl4',
      title: 'Cloud Security Architect Intern',
      description: 'Establish IAM policies, VPC security boundaries, and monitor threat signals in multi-cloud environments.',
      requiredSkills: ['AWS', 'Cloud Security', 'Networking Basics', 'Linux'],
      level: 'Advanced'
    },
    {
      id: 'cl5',
      title: 'Kubernetes Operator Intern',
      description: 'Write custom K8s operators, configure Helm charts, and manage container deployments.',
      requiredSkills: ['Kubernetes', 'Docker', 'Linux', 'Git'],
      level: 'Intermediate'
    }
  ],
  gamedev: [
    {
      id: 'gd1',
      title: 'Game Programmer Intern',
      description: 'Write gameplay scripts and implement game mechanics.',
      requiredSkills: ['C#', 'Unity', '3D Math'],
      level: 'Beginner'
    },
    {
      id: 'gd2',
      title: 'Technical Artist Intern',
      description: 'Bridge the gap between art and programming by optimizing assets and writing shaders.',
      requiredSkills: ['C#', 'Unity', 'Graphics Programming'],
      level: 'Intermediate'
    },
    {
      id: 'gd3',
      title: 'Engine Developer Intern',
      description: 'Work deep within the game engine to optimize performance.',
      requiredSkills: ['C++', 'Unreal Engine', 'Physics'],
      level: 'Advanced'
    },
    {
      id: 'gd4',
      title: 'Gameplay Programmer Intern',
      description: 'Script character abilities, enemy AI state machines, and fine-tune gameplay feel in Unreal Engine.',
      requiredSkills: ['C++', 'Unreal Engine', 'Game Design Basics'],
      level: 'Intermediate'
    },
    {
      id: 'gd5',
      title: 'Shader & VFX Intern',
      description: 'Write highly optimized compute shaders, particle effects, and post-processing filters in HLSL/GLSL.',
      requiredSkills: ['Unity', 'Graphics Programming', 'UI Design Basics'],
      level: 'Advanced'
    }
  ],
  blockchain: [
    {
      id: 'bc1',
      title: 'Web3 Frontend Intern',
      description: 'Connect React interfaces to blockchain smart contracts.',
      requiredSkills: ['JavaScript', 'React', 'Web3.js'],
      level: 'Beginner'
    },
    {
      id: 'bc2',
      title: 'Smart Contract Developer Intern',
      description: 'Write, test, and deploy Solidity smart contracts.',
      requiredSkills: ['Solidity', 'Ethereum', 'Smart Contracts'],
      level: 'Intermediate'
    },
    {
      id: 'bc3',
      title: 'DeFi Researcher Intern',
      description: 'Analyze decentralized finance protocols and tokenomics.',
      requiredSkills: ['Cryptography', 'Blockchain Concepts', 'Math/Statistics'],
      level: 'Advanced'
    },
    {
      id: 'bc4',
      title: 'Rust Protocol Intern',
      description: 'Contribute to core protocol changes, memory optimization, and consensus client development in Rust.',
      requiredSkills: ['Cryptography', 'Blockchain Concepts', 'Linux'],
      level: 'Advanced'
    },
    {
      id: 'bc5',
      title: 'Tokenomics Analyst Intern',
      description: 'Model economic game theory systems, token emission schedules, and liquidity pool parameters.',
      requiredSkills: ['Blockchain Concepts', 'Math/Statistics', 'Excel'],
      level: 'Intermediate'
    }
  ],
  uiux: [
    {
      id: 'ux1',
      title: 'UI Design Intern',
      description: 'Create high-fidelity mockups and components for web and mobile apps.',
      requiredSkills: ['Figma', 'Color Theory', 'Typography'],
      level: 'Beginner'
    },
    {
      id: 'ux2',
      title: 'UX Research Intern',
      description: 'Conduct user interviews, surveys, and usability testing.',
      requiredSkills: ['User Research', 'Wireframing', 'Prototyping'],
      level: 'Intermediate'
    },
    {
      id: 'ux3',
      title: 'Product Design Intern',
      description: 'Take ownership of the end-to-end design process for new features.',
      requiredSkills: ['Figma', 'Interactive Prototyping', 'Design Systems'],
      level: 'Advanced'
    },
    {
      id: 'ux4',
      title: 'Design Systems Engineer Intern',
      description: 'Maintain core design tokens, document component variants, and bridge the gap between design and frontend code.',
      requiredSkills: ['Figma', 'CSS', 'React', 'Git'],
      level: 'Intermediate'
    },
    {
      id: 'ux5',
      title: 'Interaction Design Intern',
      description: 'Focus on designing motion graphics, micro-interactions, and visual feedback states for user journeys.',
      requiredSkills: ['Figma', 'Interactive Prototyping', 'Color Theory'],
      level: 'Beginner'
    }
  ]
};

export default internshipRoles;
