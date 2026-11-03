/**
 * Curated Structured Learning Roadmaps across 17 Industry Specializations
 * Inspired by CareerCaffe learning paths, tailored for Career Navigator students.
 */

const ROADMAPS = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Development',
    category: 'Full Stack Development',
    icon: '🌐',
    difficulty: 'Intermediate',
    duration: '14 Weeks',
    requiredSkills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    description: 'Master modern full-stack web engineering from semantic DOM to distributed cloud backends.',
    stages: [
      {
        stageNumber: 1,
        title: 'Modern Web Foundations & Semantic DOM',
        duration: 'Weeks 1-2',
        topics: ['Semantic HTML5 & Accessibility (WCAG)', 'Modern CSS3, Flexbox, CSS Grid', 'Responsive Layouts & Mobile First Design'],
        resources: [
          { title: 'MDN Web Docs: HTML & CSS Guide', type: 'Documentation', url: 'https://developer.mozilla.org', isFree: true },
          { title: 'FreeCodeCamp Responsive Web Design', type: 'Course', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', isFree: true }
        ],
        assignment: 'Build a responsive personal developer portfolio with light/dark glassmorphic theming.',
        miniProject: 'Interactive Product Showcase with CSS Grid and smooth modal overlays.'
      },
      {
        stageNumber: 2,
        title: 'JavaScript Mastery & Asynchronous Event Loops',
        duration: 'Weeks 3-4',
        topics: ['ES6+ Syntactic Sugar & Destructuring', 'Closures, Prototypes & Scope Chains', 'Async/Await, Promises & Fetch API'],
        resources: [
          { title: 'JavaScript.info: The Modern JS Tutorial', type: 'Tutorial', url: 'https://javascript.info', isFree: true },
          { title: 'You Don\'t Know JS Yet', type: 'Book', url: 'https://github.com/getify/You-Dont-Know-JS', isFree: true }
        ],
        assignment: 'Build a client-side search and filtering engine with debounce and local storage caching.',
        miniProject: 'Real-time Currency Converter & Financial Analytics Tracker fetching live APIs.'
      },
      {
        stageNumber: 3,
        title: 'React 19 & Component State Architectures',
        duration: 'Weeks 5-7',
        topics: ['Functional Components & Custom Hooks', 'Context API & Scalable State Management', 'React Router v7 & Dynamic Route Loaders'],
        resources: [
          { title: 'React Official Documentation', type: 'Documentation', url: 'https://react.dev', isFree: true },
          { title: 'Scrimba Learn React Course', type: 'Course', url: 'https://scrimba.com/learn/learnreact', isFree: true }
        ],
        assignment: 'Refactor complex state into memoized custom hooks with unit test coverage.',
        miniProject: 'Collaborative Task Kanban Board with drag-and-drop mechanics.'
      },
      {
        stageNumber: 4,
        title: 'Server-Side Engineering with Node.js & Express',
        duration: 'Weeks 8-10',
        topics: ['RESTful API Design Principles', 'Express Middleware Pipeline & Error Handling', 'Stateless JWT Authentication & Bcrypt Password Hashing'],
        resources: [
          { title: 'Node.js Official Documentation', type: 'Documentation', url: 'https://nodejs.org/docs', isFree: true },
          { title: 'MDN Express/Node Web Development', type: 'Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs', isFree: true }
        ],
        assignment: 'Design an authenticated REST API with rate limiting, helmet security, and CORS policies.',
        miniProject: 'Multi-tenant Content Management System API with role-based access control (RBAC).'
      },
      {
        stageNumber: 5,
        title: 'Database Design with MongoDB & Mongoose',
        duration: 'Weeks 11-12',
        topics: ['NoSQL Schema Design & Normalization Tradeoffs', 'Mongoose ODM Validators & Hooks', 'Aggregation Pipelines & Index Optimization'],
        resources: [
          { title: 'MongoDB University Courses', type: 'Course', url: 'https://learn.mongodb.com', isFree: true },
          { title: 'Mongoose Documentation', type: 'Documentation', url: 'https://mongoosejs.com', isFree: true }
        ],
        assignment: 'Write aggregation queries analyzing user engagement metrics over time.',
        miniProject: 'E-commerce Inventory & Order Management Engine with atomic transactions.'
      },
      {
        stageNumber: 6,
        title: 'Testing, Docker & Production Deployment',
        duration: 'Weeks 13-14',
        topics: ['Unit & Integration Testing (Jest & Supertest)', 'Docker Containerization & Multi-stage Builds', 'CI/CD Pipelines & Cloud Hosting (Render/Vercel)'],
        resources: [
          { title: 'Docker Official Getting Started', type: 'Tutorial', url: 'https://docs.docker.com/get-started/', isFree: true },
          { title: 'GitHub Actions Documentation', type: 'Documentation', url: 'https://docs.github.com/en/actions', isFree: true }
        ],
        assignment: 'Containerize backend and frontend with docker-compose for zero-config local spins.',
        miniProject: 'Automated GitHub Actions CI/CD pipeline running tests and pushing to production cloud.'
      }
    ],
    finalProject: {
      title: 'Career Navigator Enterprise Full-Stack Portal',
      description: 'End-to-end multi-platform career acceleration system with interactive roadmaps, live database persistence, and AI job matching.'
    }
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering & UI Systems',
    category: 'Frontend Development',
    icon: '🎨',
    difficulty: 'Beginner',
    duration: '12 Weeks',
    requiredSkills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Figma'],
    description: 'Build visually stunning, accessible, high-performance web applications and design systems.',
    stages: [
      {
        stageNumber: 1,
        title: 'Advanced CSS & Responsive Architecture',
        duration: 'Weeks 1-3',
        topics: ['CSS Custom Properties & Theming', 'Subgrid, Container Queries & Modern Layouts', 'Glassmorphism & Micro-animations with Keyframes'],
        resources: [
          { title: 'CSS-Tricks Flexbox & Grid Guides', type: 'Article', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', isFree: true }
        ],
        assignment: 'Build a responsive dark-mode dashboard adhering to WCAG 2.1 AAA contrast ratios.',
        miniProject: 'Interactive Design System Styleguide with interactive color palettes and components.'
      },
      {
        stageNumber: 2,
        title: 'JavaScript Deep Dive & TypeScript Fundamentals',
        duration: 'Weeks 4-6',
        topics: ['DOM API Performance & Virtual DOM Concepts', 'TypeScript Types, Interfaces & Generics', 'Modular Bundlers (Vite) & ES Modules'],
        resources: [
          { title: 'TypeScript Official Handbook', type: 'Documentation', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', isFree: true }
        ],
        assignment: 'Convert a vanilla JavaScript codebase into strict type-safe TypeScript.',
        miniProject: 'TypeScript Canvas Particle Physics Simulator.'
      },
      {
        stageNumber: 3,
        title: 'React 19 & Component Architecture',
        duration: 'Weeks 7-9',
        topics: ['React 19 Actions & useActionState', 'Optimistic UI Updates & Error Boundaries', 'Tailwind CSS Component System Architecture'],
        resources: [
          { title: 'React 19 Release Notes & Guides', type: 'Documentation', url: 'https://react.dev/blog/2024/04/25/react-19', isFree: true }
        ],
        assignment: 'Implement an accessible multi-step form wizard with comprehensive client validation.',
        miniProject: 'SaaS Analytics Dashboard with interactive SVG charts.'
      },
      {
        stageNumber: 4,
        title: 'Web Performance & State Machines',
        duration: 'Weeks 10-12',
        topics: ['Core Web Vitals (LCP, FID, CLS)', 'Code Splitting, Lazy Loading & Bundle Analysis', 'Lighthouse 100/100 Auditing'],
        resources: [
          { title: 'web.dev by Google: Core Web Vitals', type: 'Article', url: 'https://web.dev/vitals/', isFree: true }
        ],
        assignment: 'Profile and optimize bundle size by replacing heavy libraries with lightweight primitives.',
        miniProject: 'Instant search engine querying 10,000+ records with virtualized scrolling.'
      }
    ],
    finalProject: {
      title: 'Full-featured Headless UI Component Library & Docs',
      description: 'Production-ready component library published with TypeScript definitions, storybook testing, and theme tokens.'
    }
  },
  {
    id: 'backend',
    title: 'Backend Engineering & Distributed Systems',
    category: 'Backend Development',
    icon: '⚙️',
    difficulty: 'Intermediate',
    duration: '12 Weeks',
    requiredSkills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'REST', 'WebSockets'],
    description: 'Design robust server architectures, scalable relational and NoSQL databases, and real-time streaming engines.',
    stages: [
      {
        stageNumber: 1,
        title: 'Node.js Runtime & Asynchronous Internals',
        duration: 'Weeks 1-3',
        topics: ['Libuv Event Loop, Worker Threads & Clustering', 'Buffer, Streams & File System Handling', 'HTTP/2 and Network Protocols'],
        resources: [
          { title: 'Node.js Event Loop Guide', type: 'Article', url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick', isFree: true }
        ],
        assignment: 'Build a high-performance streaming file upload server with backpressure handling.',
        miniProject: 'Memory-efficient large CSV data transformation microservice.'
      },
      {
        stageNumber: 2,
        title: 'API Architecture & Database Design',
        duration: 'Weeks 4-6',
        topics: ['REST vs GraphQL vs gRPC Tradeoffs', 'PostgreSQL Relational Normalization & ACID Transactions', 'Mongoose Schema Design & Indexing Strategies'],
        resources: [
          { title: 'PostgreSQL Official Documentation', type: 'Documentation', url: 'https://www.postgresql.org/docs/', isFree: true }
        ],
        assignment: 'Design normalized schemas with foreign keys, composite indexes, and cascading deletes.',
        miniProject: 'Banking ledger API with atomic double-entry bookkeeping.'
      },
      {
        stageNumber: 3,
        title: 'Caching, Queues & Real-Time WebSockets',
        duration: 'Weeks 7-9',
        topics: ['Redis In-Memory Caching & Session Stores', 'Message Queues (BullMQ / RabbitMQ)', 'WebSocket Bidirectional Communication'],
        resources: [
          { title: 'Redis University: Fast In-Memory Data', type: 'Course', url: 'https://university.redis.com', isFree: true }
        ],
        assignment: 'Implement distributed rate-limiting using Redis sliding-window algorithm.',
        miniProject: 'Real-time collaborative notification engine with message delivery acknowledgments.'
      },
      {
        stageNumber: 4,
        title: 'Security, Monitoring & Containerization',
        duration: 'Weeks 10-12',
        topics: ['OWASP API Security Top 10 Safeguards', 'Structured Logging & Distributed Tracing (Pino/Winston)', 'Docker Swarm & Kubernetes Basics'],
        resources: [
          { title: 'OWASP API Security Project', type: 'Documentation', url: 'https://owasp.org/www-project-api-security/', isFree: true }
        ],
        assignment: 'Penetration test backend with SQL/NoSQL injection payloads and verify complete sanitization.',
        miniProject: 'Scalable Microservices Gateway with centralized JWT authorization and health telemetry.'
      }
    ],
    finalProject: {
      title: 'High-Concurrency Real-time Auction & Bidding Platform',
      description: 'Distributed backend with sub-50ms WebSocket bid updates, Redis state persistence, and transaction guarantees.'
    }
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Business Intelligence',
    category: 'Data Analytics',
    icon: '📊',
    difficulty: 'Beginner',
    duration: '12 Weeks',
    requiredSkills: ['SQL', 'Python', 'Pandas', 'Excel', 'Power BI', 'Tableau', 'Statistics'],
    description: 'Transform raw enterprise records into actionable insights, executive KPI dashboards, and statistical forecasts.',
    stages: [
      {
        stageNumber: 1,
        title: 'Enterprise SQL & Relational Querying',
        duration: 'Weeks 1-3',
        topics: ['Complex JOINs, Subqueries & Filtering', 'Window Functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG)', 'Common Table Expressions (CTEs) & Optimization'],
        resources: [
          { title: 'Mode Analytics SQL Tutorial', type: 'Tutorial', url: 'https://mode.com/sql-tutorial/', isFree: true },
          { title: 'LeetCode Database Practice Problems', type: 'Practice platform', url: 'https://leetcode.com/problemset/database/', isFree: true }
        ],
        assignment: 'Write window function queries calculating 7-day rolling revenue and customer retention cohorts.',
        miniProject: 'Customer Lifetime Value (LTV) and Churn Analysis on 500k e-commerce records.'
      },
      {
        stageNumber: 2,
        title: 'Data Wrangling & Statistical EDA with Python',
        duration: 'Weeks 4-6',
        topics: ['Pandas DataFrame Manipulations & Imputation', 'Descriptive & Inferential Statistics', 'Data Visualization with Matplotlib & Seaborn'],
        resources: [
          { title: 'Kaggle Learn: Python & Pandas', type: 'Course', url: 'https://www.kaggle.com/learn', isFree: true }
        ],
        assignment: 'Clean an ambiguous real-world dataset with missing values, typos, and outliers.',
        miniProject: 'Hospital Patient Readmission Statistical Analysis with correlation heatmaps.'
      },
      {
        stageNumber: 3,
        title: 'Business Intelligence Dashboards (Power BI / Tableau)',
        duration: 'Weeks 7-9',
        topics: ['Data Modeling & Star/Snowflake Schemas', 'DAX Measures & Calculated Columns', 'Interactive Drill-downs & Parameter Filters'],
        resources: [
          { title: 'Microsoft Power BI Guided Learning', type: 'Documentation', url: 'https://learn.microsoft.com/en-us/power-bi/', isFree: true }
        ],
        assignment: 'Design a normalized star schema from denormalized transactional tables.',
        miniProject: 'Executive Sales & Operations KPI Dashboard with automated refresh.'
      },
      {
        stageNumber: 4,
        title: 'Predictive Analytics & Executive Storytelling',
        duration: 'Weeks 10-12',
        topics: ['Linear Regression & Trend Forecasting', 'Hypothesis Testing & A/B Testing Analysis', 'Executive Presentations & Actionable Recommendations'],
        resources: [
          { title: 'Harvard Business Review: Storytelling with Data', type: 'Article', url: 'https://hbr.org/2013/04/how-to-tell-a-story-with-data', isFree: true }
        ],
        assignment: 'Evaluate an A/B test experiment with p-value calculation and sample size power analysis.',
        miniProject: 'Comprehensive Business Growth Strategy Report presented with interactive visuals.'
      }
    ],
    finalProject: {
      title: 'Global Supply Chain & Logistics Analytics Platform',
      description: 'End-to-end data pipeline from SQL extraction to automated Power BI dashboards and Python predictive trend charts.'
    }
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Artificial Intelligence',
    icon: '🤖',
    difficulty: 'Advanced',
    duration: '14 Weeks',
    requiredSkills: ['Python', 'PyTorch', 'Scikit-learn', 'NumPy', 'Math/Calculus', 'Transformers', 'FastAPI'],
    description: 'Build predictive machine learning algorithms, deep neural architectures, and LLM generative applications.',
    stages: [
      {
        stageNumber: 1,
        title: 'Mathematical Foundations & Scientific Python',
        duration: 'Weeks 1-3',
        topics: ['Linear Algebra: Eigenvalues, Vector Spaces, Matrix Decomposition', 'Multivariate Calculus & Gradient Descent', 'NumPy Vectorized Calculations & Broadcasting'],
        resources: [
          { title: '3Blue1Brown: Essence of Linear Algebra', type: 'Video', url: 'https://www.3blue1brown.com/topics/linear-algebra', isFree: true },
          { title: 'NumPy Official Tutorial', type: 'Documentation', url: 'https://numpy.org/doc/stable/user/quickstart.html', isFree: true }
        ],
        assignment: 'Implement batch gradient descent and linear regression from scratch without external libraries.',
        miniProject: 'Vectorized Euclidean Distance Recommender on multi-dimensional feature space.'
      },
      {
        stageNumber: 2,
        title: 'Supervised & Unsupervised Machine Learning',
        duration: 'Weeks 4-6',
        topics: ['Logistic Regression, Decision Trees & Random Forests', 'Support Vector Machines & Kernel Tricks', 'K-Means Clustering & Principal Component Analysis (PCA)'],
        resources: [
          { title: 'Scikit-learn Machine Learning Documentation', type: 'Documentation', url: 'https://scikit-learn.org/stable/', isFree: true }
        ],
        assignment: 'Tune hyper-parameters using GridSearchCV with 5-fold cross-validation.',
        miniProject: 'Credit Card Fraud Detection with imbalanced dataset resampling (SMOTE).'
      },
      {
        stageNumber: 3,
        title: 'Deep Learning & Computer Vision with PyTorch',
        duration: 'Weeks 7-9',
        topics: ['Multi-layer Perceptrons & Backpropagation Math', 'Convolutional Neural Networks (CNNs)', 'Transfer Learning with Pretrained Models (ResNet, ViT)'],
        resources: [
          { title: 'PyTorch Official Deep Learning Tutorials', type: 'Tutorial', url: 'https://pytorch.org/tutorials/', isFree: true }
        ],
        assignment: 'Train a custom CNN on medical image classification with data augmentation.',
        miniProject: 'Real-time Object Detection and Bounding Box Tracker using YOLO.'
      },
      {
        stageNumber: 4,
        title: 'Natural Language Processing & Generative AI (LLMs)',
        duration: 'Weeks 10-14',
        topics: ['Tokenization, Word2Vec & Dense Embeddings', 'Transformer Architecture (Self-Attention & Multi-Head)', 'Hugging Face Ecosystem, Prompt Engineering & RAG Pipelines'],
        resources: [
          { title: 'Hugging Face NLP Course', type: 'Course', url: 'https://huggingface.co/learn/nlp-course/', isFree: true }
        ],
        assignment: 'Build a Retrieval-Augmented Generation (RAG) system with vector embeddings.',
        miniProject: 'Domain-specific AI Copilot for student career guidance with semantic retrieval.'
      }
    ],
    finalProject: {
      title: 'Autonomous Multi-Agent Career Recommendation Engine',
      description: 'End-to-end AI platform incorporating BGE-M3 vector embeddings, local LLM reasoning, and FastAPI serving.'
    }
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Cybersecurity',
    icon: '🛡️',
    difficulty: 'Intermediate',
    duration: '12 Weeks',
    requiredSkills: ['Linux', 'Networking', 'Wireshark', 'Nmap', 'Metasploit', 'OWASP Top 10', 'Python Scripting'],
    description: 'Safeguard infrastructure, analyze network protocols, identify CVE vulnerabilities, and conduct ethical penetration testing.',
    stages: [
      {
        stageNumber: 1,
        title: 'Computer Networks & Linux Security Hardening',
        duration: 'Weeks 1-3',
        topics: ['TCP/IP Model, Subnetting, ARP, DNS & TLS Handshakes', 'Linux Privilege Management, SUID, and Kernel Hardening', 'Packet Sniffing and Protocol Analysis using Wireshark'],
        resources: [
          { title: 'OverTheWire: Bandit Wargame (Linux Security)', type: 'Practice platform', url: 'https://overthewire.org/wargames/bandit/', isFree: true },
          { title: 'Wireshark User Guide', type: 'Documentation', url: 'https://www.wireshark.org/docs/', isFree: true }
        ],
        assignment: 'Capture network traffic and reconstruct cleartext credentials from simulated insecure sessions.',
        miniProject: 'Automated Linux Security Audit Script in Bash verifying file permissions and open ports.'
      },
      {
        stageNumber: 2,
        title: 'Vulnerability Assessment & Network Reconnaissance',
        duration: 'Weeks 4-6',
        topics: ['Active vs Passive Reconnaissance (OSINT)', 'Port Scanning & Service Enumeration with Nmap', 'Vulnerability Scanners (Nessus, OpenVAS) & CVSS Scoring'],
        resources: [
          { title: 'Nmap Official Network Scanning Book', type: 'Book', url: 'https://nmap.org/book/man.html', isFree: true }
        ],
        assignment: 'Perform complete vulnerability assessment of an isolated lab network and report critical CVEs.',
        miniProject: 'Python Automated Port & Banner Grabber with service version detection.'
      },
      {
        stageNumber: 3,
        title: 'Web Application Security & OWASP Top 10',
        duration: 'Weeks 7-9',
        topics: ['SQL Injection, Blind SQLi & NoSQL Injections', 'Cross-Site Scripting (Reflected, Stored, DOM XSS)', 'Cross-Site Request Forgery (CSRF) & Broken Access Controls'],
        resources: [
          { title: 'PortSwigger Web Security Academy', type: 'Course', url: 'https://portswigger.net/web-security', isFree: true }
        ],
        assignment: 'Complete 15 PortSwigger labs demonstrating web vulnerability remediation.',
        miniProject: 'Secure Authentication & Session Gateway preventing all OWASP Top 10 attack vectors.'
      },
      {
        stageNumber: 4,
        title: 'Penetration Testing, Incident Response & Forensics',
        duration: 'Weeks 10-12',
        topics: ['Metasploit Framework Exploitation & Payload Delivery', 'Privilege Escalation on Linux and Windows Systems', 'Incident Response Playbooks, Log Forensics & SIEM Basics'],
        resources: [
          { title: 'TryHackMe Pre-Security & Jr Penetration Tester', type: 'Practice platform', url: 'https://tryhackme.com', isFree: true }
        ],
        assignment: 'Conduct an authorized penetration test on a simulated target and produce an executive report.',
        miniProject: 'Digital Forensics Investigation Toolkit analyzing disk artifacts and memory dumps.'
      }
    ],
    finalProject: {
      title: 'Enterprise Cyber Defense & Vulnerability Management Blueprint',
      description: 'Comprehensive security posture assessment including penetration testing findings, hardening scripts, and incident response runbooks.'
    }
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Computing & DevOps Engineering',
    category: 'Cloud Computing',
    icon: '☁️',
    difficulty: 'Intermediate',
    duration: '12 Weeks',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Prometheus'],
    description: 'Automate build pipelines, orchestrate container clusters, and manage declarative Infrastructure as Code.',
    stages: [
      {
        stageNumber: 1,
        title: 'Containers & Docker Architecture',
        duration: 'Weeks 1-3',
        topics: ['Container Internals (Namespaces & Cgroups)', 'Multi-stage Dockerfiles for Minimalist Production Images', 'Docker Compose Multi-service Networking'],
        resources: [
          { title: 'Docker Official Documentation', type: 'Documentation', url: 'https://docs.docker.com', isFree: true }
        ],
        assignment: 'Reduce production container image size from 1.2 GB to under 80 MB with multi-stage builds.',
        miniProject: 'Zero-downtime microservices environment orchestrated via Docker Compose.'
      },
      {
        stageNumber: 2,
        title: 'Continuous Integration & Continuous Deployment (CI/CD)',
        duration: 'Weeks 4-6',
        topics: ['GitHub Actions Workflows, Secrets & Runners', 'Automated Testing, Linting & Security Scans', 'Canary & Blue-Green Deployment Strategies'],
        resources: [
          { title: 'GitHub Actions Learning Lab', type: 'Tutorial', url: 'https://github.com/skills', isFree: true }
        ],
        assignment: 'Build a production CI/CD pipeline executing unit tests, building Docker images, and deploying to cloud.',
        miniProject: 'Automated Semantic Versioning and Changelog Release Pipeline.'
      },
      {
        stageNumber: 3,
        title: 'Cloud Infrastructure (AWS) & Terraform (IaC)',
        duration: 'Weeks 7-9',
        topics: ['AWS VPC, EC2, S3, RDS & IAM Security Roles', 'Terraform Declarative Syntax, State & Modules', 'Serverless Functions (AWS Lambda & API Gateway)'],
        resources: [
          { title: 'HashiCorp Terraform Tutorials', type: 'Tutorial', url: 'https://developer.hashicorp.com/terraform/tutorials', isFree: true }
        ],
        assignment: 'Provision high-availability multi-AZ AWS infrastructure entirely via Terraform code.',
        miniProject: 'Serverless Event-driven Image Processing Pipeline with S3 and Lambda.'
      },
      {
        stageNumber: 4,
        title: 'Kubernetes Orchestration & Observability',
        duration: 'Weeks 10-12',
        topics: ['Kubernetes Pods, Deployments, Services & Ingress', 'ConfigMaps, Secrets & Persistent Volumes', 'Prometheus Metrics & Grafana Observability Dashboards'],
        resources: [
          { title: 'Kubernetes Official Tutorials', type: 'Documentation', url: 'https://kubernetes.io/docs/tutorials/', isFree: true }
        ],
        assignment: 'Deploy a resilient 3-replica stateful application on a Kubernetes cluster with auto-scaling.',
        miniProject: 'Full-stack Kubernetes deployment with Prometheus alerts and live Grafana dashboards.'
      }
    ],
    finalProject: {
      title: 'Enterprise Multi-Region Cloud Infrastructure with GitOps',
      description: 'Production infrastructure defined via Terraform, managed with ArgoCD GitOps, and monitored via Grafana.'
    }
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development (React Native & Android)',
    category: 'Android Development',
    icon: '📱',
    difficulty: 'Intermediate',
    duration: '12 Weeks',
    requiredSkills: ['React Native', 'Expo', 'JavaScript', 'TypeScript', 'AsyncStorage', 'REST APIs', 'Native Modules'],
    description: 'Design and deploy native iOS and Android mobile experiences with smooth 60fps animations and offline synchronization.',
    stages: [
      {
        stageNumber: 1,
        title: 'React Native Primitives & Styling System',
        duration: 'Weeks 1-3',
        topics: ['Native Components (View, Text, FlatList, ScrollView)', 'Flexbox on Mobile & Responsive Screen Scaling', 'Glassmorphism & Color Systems on Android/iOS'],
        resources: [
          { title: 'React Native Official Documentation', type: 'Documentation', url: 'https://reactnative.dev/docs/getting-started', isFree: true },
          { title: 'Expo Documentation', type: 'Documentation', url: 'https://docs.expo.dev', isFree: true }
        ],
        assignment: 'Build a 60fps smooth scrolling student feed with infinite scroll and pull-to-refresh.',
        miniProject: 'Mobile Weather & Forecast App using native geolocation and clean cards.'
      },
      {
        stageNumber: 2,
        title: 'Navigation Architecture & Local Persistence',
        duration: 'Weeks 4-6',
        topics: ['React Navigation (Stack, Bottom Tabs & Modals)', 'State Management across Tabs with Context API', 'AsyncStorage Offline Cache & Token Management'],
        resources: [
          { title: 'React Navigation Documentation', type: 'Documentation', url: 'https://reactnavigation.org/docs/getting-started', isFree: true }
        ],
        assignment: 'Implement a nested tab-and-stack navigator with modal authentication flows.',
        miniProject: 'Offline-first Student Habit & Study Tracker with persistent AsyncStorage.'
      },
      {
        stageNumber: 3,
        title: 'Native Device APIs & Media Management',
        duration: 'Weeks 7-9',
        topics: ['Expo Document Picker & File System Operations', 'Camera & Image Capture Integration', 'Push Notifications Architecture (Expo Notifications)'],
        resources: [
          { title: 'Expo Camera & Document Picker API Docs', type: 'Documentation', url: 'https://docs.expo.dev/versions/latest/sdk/document-picker/', isFree: true }
        ],
        assignment: 'Build an in-app PDF resume uploader extracting file metadata.',
        miniProject: 'Resume Scanner & OCR Mobile Utility with instant skill extraction.'
      },
      {
        stageNumber: 4,
        title: 'Performance, App Bundling & Store Publishing',
        duration: 'Weeks 10-12',
        topics: ['Memory Leak Debugging & Profiler Tools', 'Expo EAS Build for Android APK & iOS IPA', 'Google Play Store & Apple App Store Guidelines'],
        resources: [
          { title: 'Expo EAS Build Documentation', type: 'Documentation', url: 'https://docs.expo.dev/build/introduction/', isFree: true }
        ],
        assignment: 'Build a standalone release APK with optimized Hermes JS engine.',
        miniProject: 'Production-ready Career Navigator Mobile Companion App.'
      }
    ],
    finalProject: {
      title: 'Career Navigator Native Mobile Application',
      description: 'Fully responsive cross-platform student companion app with real-time MongoDB Atlas sync, roadmap tracking, and offline resilience.'
    }
  },
  {
    id: 'dsa',
    title: 'Data Structures, Algorithms & Problem Solving',
    category: 'Data Structures and Algorithms',
    icon: '⚡',
    difficulty: 'Intermediate',
    duration: '12 Weeks',
    requiredSkills: ['C++', 'Java', 'Python', 'Time Complexity', 'Trees', 'Graphs', 'Dynamic Programming'],
    description: 'Master algorithmic problem solving, Big-O analysis, and technical interview coding challenges.',
    stages: [
      {
        stageNumber: 1,
        title: 'Linear Data Structures & Complexity Analysis',
        duration: 'Weeks 1-3',
        topics: ['Asymptotic Notation: Big-O, Big-Omega, Big-Theta', 'Arrays, Strings, Two-Pointer & Sliding Window Techniques', 'Linked Lists (Singly, Doubly, Circular) & Fast/Slow Pointers'],
        resources: [
          { title: 'NeetCode 150 Problem Roadmap', type: 'Practice platform', url: 'https://neetcode.io/roadmap', isFree: true },
          { title: 'Visualgo Algorithm Visualizer', type: 'Tool', url: 'https://visualgo.net', isFree: true }
        ],
        assignment: 'Solve 25 sliding-window and two-pointer problems on LeetCode with O(1) auxiliary space.',
        miniProject: 'Interactive Visualizer for Array Transformations and Sorting Algorithms.'
      },
      {
        stageNumber: 2,
        title: 'Stacks, Queues, Recursion & Hashing',
        duration: 'Weeks 4-6',
        topics: ['Monotonic Stacks & Applications', 'Queues, Deques & Priority Queues (Heaps)', 'Hash Tables, Collision Resolution & Amortized Complexity'],
        resources: [
          { title: 'GeeksforGeeks Data Structures Guide', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/data-structures/', isFree: true }
        ],
        assignment: 'Implement a LRU Cache with O(1) get and put operations using doubly linked lists and hash maps.',
        miniProject: 'Expression Evaluator supporting parenthetical precedence and postfix evaluation.'
      },
      {
        stageNumber: 3,
        title: 'Non-Linear Structures: Trees & Graphs',
        duration: 'Weeks 7-9',
        topics: ['Binary Trees, BSTs & Lowest Common Ancestor (LCA)', 'Graph Representations (Adjacency Matrix vs List)', 'BFS, DFS, Dijkstra\'s Shortest Path & Topological Sort'],
        resources: [
          { title: 'MIT 6.006 Introduction to Algorithms', type: 'Course', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', isFree: true }
        ],
        assignment: 'Implement cycle detection in directed graphs using both DFS coloring and Kahn\'s algorithm.',
        miniProject: 'Shortest Path Route Planner on Real-world City Graph with Dijkstra.'
      },
      {
        stageNumber: 4,
        title: 'Dynamic Programming & Advanced Interview Strategies',
        duration: 'Weeks 10-12',
        topics: ['Memoization vs Tabulation Paradigms', '0/1 Knapsack, Longest Common Subsequence (LCS) & Intervals', 'Bit Manipulation, Trie Structures & Mock Coding Interviews'],
        resources: [
          { title: 'LeetCode Top Interview 150', type: 'Practice platform', url: 'https://leetcode.com/studyplan/top-interview-150/', isFree: true }
        ],
        assignment: 'Solve 20 classic DP problems and classify them by recurrence pattern.',
        miniProject: 'Interactive Technical Interview Practice CLI with automated test case evaluation.'
      }
    ],
    finalProject: {
      title: 'Algorithmic Problem-Solving Portfolio & Automated Grader',
      description: 'Comprehensive repository of 150+ solved algorithmic challenges with detailed complexity proofs and interactive visualizations.'
    }
  },
  {
    id: 'python-dev',
    title: 'Python Development & Automation Systems',
    category: 'Python Development',
    icon: '🐍',
    difficulty: 'Beginner',
    duration: '10 Weeks',
    requiredSkills: ['Python 3', 'OOP', 'FastAPI', 'BeautifulSoup', 'SQLAlchemy', 'Pytest', 'AsyncIO'],
    description: 'Learn modern idiomatic Python, backend API engineering, web scraping, and automated developer tooling.',
    stages: [
      {
        stageNumber: 1,
        title: 'Idiomatic Python & Object-Oriented Design',
        duration: 'Weeks 1-3',
        topics: ['List/Dict Comprehensions, Generators & Iterators', 'Decorators, Context Managers & Magic Methods', 'Type Hints, Pydantic & PEP-8 Standards'],
        resources: [
          { title: 'Python Official Documentation & Tutorial', type: 'Documentation', url: 'https://docs.python.org/3/tutorial/', isFree: true }
        ],
        assignment: 'Write a custom context manager and decorator benchmarking execution memory usage.',
        miniProject: 'Object-Oriented Bank Account Simulation with transaction rollbacks.'
      },
      {
        stageNumber: 2,
        title: 'Web Scraping & Automation Tooling',
        duration: 'Weeks 4-6',
        topics: ['HTTP Requests, BeautifulSoup & lxml Parsing', 'Playwright / Selenium Headless Automation', 'Automating File Processing & Email Notifications'],
        resources: [
          { title: 'Automate the Boring Stuff with Python', type: 'Book', url: 'https://automatetheboringstuff.com', isFree: true }
        ],
        assignment: 'Scrape job postings from verified public portals and extract structured JSON records.',
        miniProject: 'Daily Internship Price & Deadline Alert Bot running on schedule.'
      },
      {
        stageNumber: 3,
        title: 'Modern REST APIs with FastAPI',
        duration: 'Weeks 7-8',
        topics: ['FastAPI Routing, Dependencies & Pydantic Validation', 'AsyncIO Concurrency for I/O-bound Workloads', 'SQLAlchemy ORM & Alembic Migrations'],
        resources: [
          { title: 'FastAPI Official Documentation', type: 'Documentation', url: 'https://fastapi.tiangolo.com', isFree: true }
        ],
        assignment: 'Build an authenticated asynchronous CRUD API with auto-generated OpenAPI swagger docs.',
        miniProject: 'High-speed Student Resource Bookmark Microservice with FastAPI.'
      },
      {
        stageNumber: 4,
        title: 'Testing, Packaging & CLI Distribution',
        duration: 'Weeks 9-10',
        topics: ['Unit Testing with Pytest & Fixtures', 'Virtual Environments (Poetry/Pipenv)', 'Building CLI Tools with Typer / Click'],
        resources: [
          { title: 'Pytest Official Documentation', type: 'Documentation', url: 'https://docs.pytest.org', isFree: true }
        ],
        assignment: 'Achieve 95%+ test coverage on a Python module using pytest-cov.',
        miniProject: 'Published Command-Line Developer Utility for career roadmap tracking.'
      }
    ],
    finalProject: {
      title: 'Intelligent Web Scraping & Aggregation Engine with FastAPI',
      description: 'Production Python service scraping verified educational opportunities, extracting entities, and serving cached API responses.'
    }
  },
  {
    id: 'java-dev',
    title: 'Java Enterprise Development & Spring Boot',
    category: 'Java Development',
    icon: '☕',
    difficulty: 'Intermediate',
    duration: '12 Weeks',
    requiredSkills: ['Java 21', 'Spring Boot', 'Hibernate/JPA', 'Maven', 'MySQL', 'Microservices', 'JUnit 5'],
    description: 'Build enterprise-grade, strongly typed services with Spring Boot, Spring Security, and relational persistence.',
    stages: [
      {
        stageNumber: 1,
        title: 'Modern Java Core & Object-Oriented Principles',
        duration: 'Weeks 1-3',
        topics: ['Java 17/21 Features: Records, Pattern Matching, Sealed Classes', 'Collections Framework & Generics Deep Dive', 'Streams API, Lambdas & Functional Interfaces'],
        resources: [
          { title: 'Oracle Java Tutorials', type: 'Tutorial', url: 'https://docs.oracle.com/javase/tutorial/', isFree: true }
        ],
        assignment: 'Refactor imperative loops into declarative Java Streams with parallel execution.',
        miniProject: 'In-Memory Student Gradebook & Ranking Engine.'
      },
      {
        stageNumber: 2,
        title: 'Spring Boot 3 & REST Web Services',
        duration: 'Weeks 4-6',
        topics: ['Dependency Injection & Spring Inversion of Control (IoC)', 'Spring MVC Controllers, DTOs & Validation', 'Exception Handling with ControllerAdvice'],
        resources: [
          { title: 'Spring Boot Guides', type: 'Tutorial', url: 'https://spring.io/guides', isFree: true }
        ],
        assignment: 'Build REST endpoints with Bean Validation and custom error response payloads.',
        miniProject: 'University Course Registration API with conflict checking.'
      },
      {
        stageNumber: 3,
        title: 'Relational Persistence with Spring Data JPA & Hibernate',
        duration: 'Weeks 7-9',
        topics: ['Entity Relationships (@OneToMany, @ManyToMany)', 'Spring Data JPA Repositories & JPQL Queries', 'Database Transactions with @Transactional'],
        resources: [
          { title: 'Baeldung: Spring Data JPA Tutorials', type: 'Article', url: 'https://www.baeldung.com/category/spring/spring-data/', isFree: true }
        ],
        assignment: 'Optimize JPA queries to avoid N+1 select problems using JOIN FETCH.',
        miniProject: 'Student Internship Application Portal Backend with audit logs.'
      },
      {
        stageNumber: 4,
        title: 'Security, Testing & Microservices',
        duration: 'Weeks 10-12',
        topics: ['Spring Security 6 with Stateless JWT Filters', 'Integration Testing with Testcontainers and Mockito', 'API Gateways & Service Discovery (Eureka/Spring Cloud)'],
        resources: [
          { title: 'Spring Security Reference Documentation', type: 'Documentation', url: 'https://docs.spring.io/spring-security/reference/', isFree: true }
        ],
        assignment: 'Secure all REST endpoints with role-based JWT filters and method security.',
        miniProject: 'Enterprise Student Career Services Microservice with automated tests.'
      }
    ],
    finalProject: {
      title: 'Scalable Enterprise Student Management Platform with Spring Boot',
      description: 'Production Spring Boot application with JWT security, JPA relational persistence, Dockerized deployment, and full test suite.'
    }
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design & Product Strategy',
    category: 'UI/UX Design',
    icon: '✨',
    difficulty: 'Beginner',
    duration: '10 Weeks',
    requiredSkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
    description: 'Learn modern user-centric product design, accessibility standards, high-fidelity Figma prototyping, and design systems.',
    stages: [
      {
        stageNumber: 1,
        title: 'User Research & Information Architecture',
        duration: 'Weeks 1-3',
        topics: ['User Personas, Empathy Maps & Journey Mapping', 'Information Architecture & Card Sorting', 'Wireframing & Low-Fidelity Prototyping'],
        resources: [
          { title: 'Nielsen Norman Group UX Articles', type: 'Article', url: 'https://www.nngroup.com/articles/', isFree: true }
        ],
        assignment: 'Conduct 5 student user interviews and synthesize insights into an empathy map.',
        miniProject: 'Low-fidelity wireframe prototype of a student opportunity tracker.'
      },
      {
        stageNumber: 2,
        title: 'Visual Design Principles & Typography',
        duration: 'Weeks 4-5',
        topics: ['Visual Hierarchy, Whitespace & Contrast Ratios', 'Typography Systems & Modular Scale', 'Color Theory, Palette Generation & Dark Modes'],
        resources: [
          { title: 'Refactoring UI by Adam Wathan & Steve Schoger', type: 'Book', url: 'https://www.refactoringui.com', isFree: false }
        ],
        assignment: 'Design a high-contrast dark theme UI palette adhering to WCAG standards.',
        miniProject: 'Polished High-Fidelity Landing Page Design in Figma.'
      },
      {
        stageNumber: 3,
        title: 'Advanced Figma & Design Systems',
        duration: 'Weeks 6-8',
        topics: ['Figma Auto Layout, Constraints & Component Variants', 'Design Tokens (Color, Spacing, Typography)', 'Interactive Micro-interactions & Smart Animate'],
        resources: [
          { title: 'Figma Community Tutorials & Best Practices', type: 'Tutorial', url: 'https://help.figma.com/hc/en-us/categories/360002051613-Figma-Design', isFree: true }
        ],
        assignment: 'Build a 30-component modular design system with variants and interactive hover states.',
        miniProject: 'Complete Mobile App Prototype with realistic interactive navigation in Figma.'
      },
      {
        stageNumber: 4,
        title: 'Usability Testing & Developer Handoff',
        duration: 'Weeks 9-10',
        topics: ['Moderated & Unmoderated Usability Testing', 'Design System Documentation & Token Handoff', 'Design Quality Assurance (QA) with Engineering'],
        resources: [
          { title: 'Interaction Design Foundation Guides', type: 'Article', url: 'https://www.interaction-design.org/literature', isFree: true }
        ],
        assignment: 'Conduct usability test sessions, calculate task completion rates, and iterate design.',
        miniProject: 'Production Developer Handoff Package with annotated specs and exportable assets.'
      }
    ],
    finalProject: {
      title: 'Career Navigator End-to-End Product Design Case Study',
      description: 'Comprehensive Figma case study from user research to interactive high-fidelity prototype and design token library.'
    }
  }
];

module.exports = ROADMAPS;
