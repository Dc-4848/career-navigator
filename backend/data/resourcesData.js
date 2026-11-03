/**
 * Curated Learning Resource Library for Career Navigator
 * Inspired by CareerCaffe discovery, with verified, high-quality educational links.
 */

const RESOURCES = [
  // Web Development & Frontend
  {
    title: 'MDN Web Docs: Modern JavaScript Handbook',
    description: 'The definitive documentation and guide for JavaScript, DOM APIs, and asynchronous event loops.',
    type: 'Documentation',
    technology: 'JavaScript',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    relatedRoadmap: 'fullstack',
    relatedStage: 'Stage 2: JavaScript Mastery'
  },
  {
    title: 'FreeCodeCamp Responsive Web Design Certification',
    description: 'Interactive coding course covering HTML5, CSS3, Flexbox, CSS Grid, and responsive web principles.',
    type: 'Course',
    technology: 'HTML/CSS',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    relatedRoadmap: 'frontend',
    relatedStage: 'Stage 1: Advanced CSS'
  },
  {
    title: 'React 19 Official Documentation & Interactive Sandbox',
    description: 'Official guides, mental models, hooks API reference, and interactive examples from the React core team.',
    type: 'Documentation',
    technology: 'React',
    category: 'Frontend Development',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://react.dev',
    relatedRoadmap: 'fullstack',
    relatedStage: 'Stage 3: React 19 Architectures'
  },
  {
    title: 'JavaScript.info: The Modern JavaScript Tutorial',
    description: 'From fundamentals to advanced topics including closures, prototypes, event loops, and web components.',
    type: 'Tutorial',
    technology: 'JavaScript',
    category: 'Frontend Development',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://javascript.info',
    relatedRoadmap: 'frontend',
    relatedStage: 'Stage 2: JavaScript Deep Dive'
  },
  {
    title: 'CSS-Tricks: Complete Guide to Flexbox & Grid',
    description: 'Comprehensive visual reference sheets and interactive diagrams explaining modern CSS layout models.',
    type: 'Cheatsheet',
    technology: 'CSS3',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    relatedRoadmap: 'frontend',
    relatedStage: 'Stage 1: Advanced CSS'
  },
  {
    title: 'TypeScript Official Handbook',
    description: 'Comprehensive guide to TypeScript types, interfaces, generics, type narrowing, and utility types.',
    type: 'Book',
    technology: 'TypeScript',
    category: 'Frontend Development',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    relatedRoadmap: 'frontend',
    relatedStage: 'Stage 2: TypeScript Fundamentals'
  },
  {
    title: 'Web.dev by Google: Core Web Vitals and Performance',
    description: 'Industry-standard guidelines from Google engineers on optimizing Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).',
    type: 'Article',
    technology: 'Performance',
    category: 'Frontend Development',
    difficulty: 'Advanced',
    isFree: true,
    url: 'https://web.dev/vitals/',
    relatedRoadmap: 'frontend',
    relatedStage: 'Stage 4: Web Performance'
  },

  // Backend Development
  {
    title: 'Node.js Asynchronous Architecture & Event Loop Deep Dive',
    description: 'Detailed explanation of libuv, event loop phases, process.nextTick, microtask queues, and worker threads.',
    type: 'Article',
    technology: 'Node.js',
    category: 'Backend Development',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick',
    relatedRoadmap: 'backend',
    relatedStage: 'Stage 1: Node.js Runtime Internals'
  },
  {
    title: 'Express.js Framework Guide & Middleware Patterns',
    description: 'Official guide to building REST APIs, writing custom middleware, handling errors, and structuring routing.',
    type: 'Documentation',
    technology: 'Express',
    category: 'Backend Development',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://expressjs.com/en/guide/routing.html',
    relatedRoadmap: 'backend',
    relatedStage: 'Stage 2: API Architecture'
  },
  {
    title: 'MongoDB University: Practical Data Modeling & Aggregation',
    description: 'Free official courses and hands-on labs covering Mongoose schema design, indexing, and complex pipeline aggregations.',
    type: 'Course',
    technology: 'MongoDB',
    category: 'Backend Development',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://learn.mongodb.com',
    relatedRoadmap: 'fullstack',
    relatedStage: 'Stage 5: Database Design'
  },
  {
    title: 'Redis University: Fast In-Memory Data Structures',
    description: 'Learn how to utilize Redis for sub-millisecond caching, session stores, rate-limiting, and Pub/Sub queues.',
    type: 'Course',
    technology: 'Redis',
    category: 'Backend Development',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://university.redis.com',
    relatedRoadmap: 'backend',
    relatedStage: 'Stage 3: Caching & Real-Time'
  },
  {
    title: 'OWASP API Security Top 10 Guidelines',
    description: 'Essential checklist and mitigations against broken object level authorization, broken authentication, and injection attacks.',
    type: 'Documentation',
    technology: 'Security',
    category: 'Backend Development',
    difficulty: 'Advanced',
    isFree: true,
    url: 'https://owasp.org/www-project-api-security/',
    relatedRoadmap: 'backend',
    relatedStage: 'Stage 4: Security & Monitoring'
  },
  {
    title: 'PostgreSQL Tutorial: From Queries to Index Optimization',
    description: 'Master relational SQL syntax, transactions, indexing (B-Tree, GIN), and query execution plans (EXPLAIN ANALYZE).',
    type: 'Tutorial',
    technology: 'PostgreSQL',
    category: 'Backend Development',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://www.postgresqltutorial.com',
    relatedRoadmap: 'backend',
    relatedStage: 'Stage 2: Relational Databases'
  },

  // Data Analytics & Data Science
  {
    title: 'Mode Analytics SQL Tutorial for Data Analysts',
    description: 'Hands-on interactive SQL tutorial covering real business datasets, JOINs, window functions, and cohorts.',
    type: 'Tutorial',
    technology: 'SQL',
    category: 'Data Analytics',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://mode.com/sql-tutorial/',
    relatedRoadmap: 'data-analytics',
    relatedStage: 'Stage 1: Enterprise SQL'
  },
  {
    title: 'Kaggle Learn: Python for Data Analysis & Pandas',
    description: 'Short hands-on micro-courses covering essential data manipulation, indexing, grouping, and handling null values.',
    type: 'Course',
    technology: 'Python',
    category: 'Data Analytics',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://www.kaggle.com/learn',
    relatedRoadmap: 'data-analytics',
    relatedStage: 'Stage 2: Data Wrangling with Python'
  },
  {
    title: 'Microsoft Power BI Guided Documentation & Labs',
    description: 'Official interactive training on DAX measures, star schema data modeling, and creating executive dashboards.',
    type: 'Documentation',
    technology: 'Power BI',
    category: 'Data Analytics',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://learn.microsoft.com/en-us/power-bi/',
    relatedRoadmap: 'data-analytics',
    relatedStage: 'Stage 3: Business Intelligence Dashboards'
  },
  {
    title: 'Storytelling with Data: A Data Visualization Guide for Business',
    description: 'Best-selling guide on eliminating visual clutter, focusing audience attention, and communicating insights with charts.',
    type: 'Book',
    technology: 'Data Visualization',
    category: 'Data Analytics',
    difficulty: 'Beginner',
    isFree: false,
    url: 'https://www.storytellingwithdata.com/books',
    relatedRoadmap: 'data-analytics',
    relatedStage: 'Stage 4: Executive Storytelling'
  },

  // AI & Machine Learning
  {
    title: '3Blue1Brown: Essence of Linear Algebra',
    description: 'World-renowned visual animations providing geometric intuition for vectors, matrices, determinants, and eigenvalues.',
    type: 'Video',
    technology: 'Mathematics',
    category: 'Artificial Intelligence',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://www.3blue1brown.com/topics/linear-algebra',
    relatedRoadmap: 'ai-ml',
    relatedStage: 'Stage 1: Mathematical Foundations'
  },
  {
    title: 'Scikit-learn User Guide & Machine Learning Algorithms',
    description: 'Complete mathematical and practical guide to supervised and unsupervised algorithms with Python examples.',
    type: 'Documentation',
    technology: 'Scikit-learn',
    category: 'Artificial Intelligence',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://scikit-learn.org/stable/user_guide.html',
    relatedRoadmap: 'ai-ml',
    relatedStage: 'Stage 2: Machine Learning'
  },
  {
    title: 'PyTorch Deep Learning Zero-to-Mastery Tutorials',
    description: 'Comprehensive practical guide to building neural networks, tensors, loss functions, optimizers, and CNNs.',
    type: 'Tutorial',
    technology: 'PyTorch',
    category: 'Artificial Intelligence',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://pytorch.org/tutorials/',
    relatedRoadmap: 'ai-ml',
    relatedStage: 'Stage 3: Deep Learning'
  },
  {
    title: 'Hugging Face NLP & Transformers Course',
    description: 'Official interactive course on transformer architectures, tokenizers, fine-tuning LLMs, and deploying RAG pipelines.',
    type: 'Course',
    technology: 'Transformers',
    category: 'Artificial Intelligence',
    difficulty: 'Advanced',
    isFree: true,
    url: 'https://huggingface.co/learn/nlp-course/',
    relatedRoadmap: 'ai-ml',
    relatedStage: 'Stage 4: Generative AI'
  },

  // Data Structures & Algorithms
  {
    title: 'NeetCode 150 Practice Roadmap',
    description: 'Structured collection of 150 essential coding interview questions organized by pattern (Sliding Window, Trees, DP).',
    type: 'Practice platform',
    technology: 'Algorithms',
    category: 'Data Structures and Algorithms',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://neetcode.io/roadmap',
    relatedRoadmap: 'dsa',
    relatedStage: 'Stage 1: Linear Data Structures'
  },
  {
    title: 'VisuAlgo: Visualizing Data Structures and Algorithms',
    description: 'Interactive animated visualizations of sorting algorithms, AVL trees, graph traversals, and dynamic programming.',
    type: 'Tool',
    technology: 'Data Structures',
    category: 'Data Structures and Algorithms',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://visualgo.net',
    relatedRoadmap: 'dsa',
    relatedStage: 'Stage 2: Stacks & Queues'
  },
  {
    title: 'MIT 6.006: Introduction to Algorithms (Spring 2020)',
    description: 'Complete university lecture series with problem sets covering algorithm design, graph traversal, and dynamic programming.',
    type: 'Course',
    technology: 'Algorithms',
    category: 'Data Structures and Algorithms',
    difficulty: 'Advanced',
    isFree: true,
    url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
    relatedRoadmap: 'dsa',
    relatedStage: 'Stage 3: Trees & Graphs'
  },

  // Cloud & DevOps
  {
    title: 'Docker Official Getting Started Tutorial',
    description: 'Step-by-step introduction to containerizing applications, writing Dockerfiles, and managing networks.',
    type: 'Tutorial',
    technology: 'Docker',
    category: 'Cloud Computing',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://docs.docker.com/get-started/',
    relatedRoadmap: 'cloud-devops',
    relatedStage: 'Stage 1: Containers & Docker'
  },
  {
    title: 'Kubernetes Interactive Tutorials & Katacoda Scenarios',
    description: 'Hands-on browser-based labs for deploying, scaling, and managing resilient container clusters.',
    type: 'Tutorial',
    technology: 'Kubernetes',
    category: 'Cloud Computing',
    difficulty: 'Advanced',
    isFree: true,
    url: 'https://kubernetes.io/docs/tutorials/',
    relatedRoadmap: 'cloud-devops',
    relatedStage: 'Stage 4: Kubernetes Orchestration'
  },
  {
    title: 'HashiCorp Terraform Associate Certification Path',
    description: 'Official tutorials on writing declarative HCL infrastructure definitions, state management, and reusable modules.',
    type: 'Tutorial',
    technology: 'Terraform',
    category: 'Cloud Computing',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://developer.hashicorp.com/terraform/tutorials',
    relatedRoadmap: 'cloud-devops',
    relatedStage: 'Stage 3: Terraform & IaC'
  },

  // Mobile App Development
  {
    title: 'React Native Official Getting Started Guide',
    description: 'Official guide to React Native components, styling, handling user input, and debugging with Flipper.',
    type: 'Documentation',
    technology: 'React Native',
    category: 'Android Development',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://reactnative.dev/docs/getting-started',
    relatedRoadmap: 'mobile-app',
    relatedStage: 'Stage 1: React Native Primitives'
  },
  {
    title: 'Expo Guides: Cross-Platform Native APIs and EAS Build',
    description: 'Complete documentation for Expo Go, native device modules, file system pickers, and automated cloud builds.',
    type: 'Documentation',
    technology: 'Expo',
    category: 'Android Development',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://docs.expo.dev',
    relatedRoadmap: 'mobile-app',
    relatedStage: 'Stage 3: Native Device APIs'
  },
  {
    title: 'React Navigation v7 Complete Documentation',
    description: 'Official guides for configuring Stack, Bottom Tabs, Drawer navigators, deep linking, and type-safe navigation.',
    type: 'Documentation',
    technology: 'React Navigation',
    category: 'Android Development',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://reactnavigation.org/docs/getting-started',
    relatedRoadmap: 'mobile-app',
    relatedStage: 'Stage 2: Navigation Architecture'
  },

  // Cybersecurity
  {
    title: 'PortSwigger Web Security Academy',
    description: 'Free interactive labs and high-quality guides for practicing web penetration testing, SQLi, XSS, and CSRF.',
    type: 'Course',
    technology: 'Cybersecurity',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://portswigger.net/web-security',
    relatedRoadmap: 'cybersecurity',
    relatedStage: 'Stage 3: Web Application Security'
  },
  {
    title: 'OverTheWire: Bandit Wargames for Linux Security',
    description: 'Gamified challenge series designed to build practical Linux command-line, file permission, and SSH proficiency.',
    type: 'Practice platform',
    technology: 'Linux',
    category: 'Cybersecurity',
    difficulty: 'Beginner',
    isFree: true,
    url: 'https://overthewire.org/wargames/bandit/',
    relatedRoadmap: 'cybersecurity',
    relatedStage: 'Stage 1: Linux Security Hardening'
  },
  {
    title: 'Wireshark User Guide & Protocol Analysis',
    description: 'Official manual on packet capture filters, protocol dissecting, TCP stream reconstruction, and network troubleshooting.',
    type: 'Documentation',
    technology: 'Wireshark',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    isFree: true,
    url: 'https://www.wireshark.org/docs/',
    relatedRoadmap: 'cybersecurity',
    relatedStage: 'Stage 1: Linux Security Hardening'
  }
];

module.exports = RESOURCES;
