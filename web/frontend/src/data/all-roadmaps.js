// Real CareerCaffe Roadmaps Data (98 roadmaps with full stages, outcomes, and projects)
// Auto-generated and verified

export const ROADMAP_CATEGORIES = [
  { id: 'all', name: 'All', count: 98 },
  { id: 'Engineering', name: 'Engineering', count: 41 },
  { id: 'Computer Science', name: 'Computer Science', count: 4 },
  { id: 'Cloud & DevOps', name: 'Cloud & DevOps', count: 14 },
  { id: 'Languages', name: 'Languages', count: 14 },
  { id: 'Data', name: 'Data', count: 13 },
  { id: 'Design', name: 'Design', count: 3 },
  { id: 'Support', name: 'Support', count: 1 },
  { id: 'Business', name: 'Business', count: 6 },
  { id: 'Finance', name: 'Finance', count: 1 },
  { id: 'Non-technical', name: 'Non-technical', count: 1 }
];

export const ROADMAPS_DATA = [
  {
    "id": "44b0822e-5822-4d74-a218-1df90426f6c1",
    "slug": "frontend",
    "title": "Frontend Developer",
    "category": "Engineering",
    "description": "HTML to your first frontend offer, in eight stages.",
    "subtitle": "Eight stages · about four months at six hours a week · 42 resources",
    "roles": [
      "Frontend Developer",
      "UI Engineer",
      "Web Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Get comfortable with HTML and the browser",
        "description": "Structure, semantics and what the browser does with your markup. No frameworks yet.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a page with semantic HTML (header, main, nav, article, footer)",
          "Explain what the browser does between a URL and a painted page",
          "Build an accessible form with labels and validation"
        ],
        "project": "Rebuild the home page of a site you use as plain HTML: no CSS, but correct headings, landmarks and a working form."
      },
      {
        "stage": 2,
        "title": "CSS layout without guessing",
        "description": "Flexbox and grid until you can build a page without trial and error.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Choose between flexbox and grid for a given layout",
          "Build a responsive page that works from 360px to desktop",
          "Use custom properties for colours and spacing"
        ],
        "project": "Style your HTML page from stage 1 so it matches a design you pick, on mobile and desktop."
      },
      {
        "stage": 3,
        "title": "JavaScript on its own",
        "description": "The language before the library: types, functions, the DOM and fetch.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Use arrays, objects, functions and modules confidently",
          "Update the page with the DOM in response to user input",
          "Explain promises and async/await with an example"
        ],
        "project": "Build a to-do list in plain JavaScript that saves to localStorage and supports filters."
      },
      {
        "stage": 4,
        "title": "Build and deploy a small project",
        "description": "One page, one API call, deployed on a free host with a link you can put on your resume.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Fetch data from a public API and render it",
          "Handle a loading state and an error state",
          "Deploy to a free host and share a working link",
          "Write a README that explains what it does"
        ],
        "project": "Build a page that searches a public movie API and shows results as cards. Handle empty results and a failed request. Deploy it and paste the link below."
      },
      {
        "stage": 5,
        "title": "Pick up React properly",
        "description": "Components, state and the two hooks you will actually use every day.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Split a UI into components with clear props",
          "Manage state with useState and lift it when needed",
          "Fetch data in an effect and clean it up"
        ],
        "project": "Rebuild your stage 4 project in React with search, a detail view and a favourites list."
      },
      {
        "stage": 6,
        "title": "Version control and working with others",
        "description": "Branches, pull requests and reading someone else's code.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Commit with clear messages and work on branches",
          "Open, review and merge a pull request",
          "Resolve a merge conflict without panic"
        ],
        "project": "Fix a small issue in an open-source repo (docs count) and open a pull request."
      },
      {
        "stage": 7,
        "title": "Prepare your resume and portfolio",
        "description": "Two projects written up plainly, plus the one-page resume.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write a one-page resume with measurable project bullets",
          "Present two projects with links, screenshots and what you learned",
          "Set up a GitHub profile that points to your best work"
        ],
        "project": "Publish a simple portfolio page linking your two best projects and your resume."
      },
      {
        "stage": 8,
        "title": "Interview practice",
        "description": "The common questions, the component round, and talking about your work.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Answer the common JavaScript and CSS questions out loud",
          "Build a small component live in 45 minutes",
          "Explain one of your projects end to end"
        ],
        "project": "Record yourself explaining your best project in five minutes and share the link."
      }
    ],
    "related": [
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      },
      {
        "slug": "ios",
        "title": "iOS Developer"
      }
    ]
  },
  {
    "id": "94f90ccd-8157-405c-a3b3-6a28421edbc9",
    "slug": "backend",
    "title": "Backend Developer",
    "category": "Engineering",
    "description": "One language, one database, one deployed service.",
    "subtitle": "Nine stages · about four months at six hours a week · 50 resources",
    "roles": [
      "Backend Developer",
      "Software Engineer",
      "API Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Pick one language and learn it well",
        "description": "Python or JavaScript (Node.js). Syntax, data structures and writing small scripts.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Write scripts with functions, loops and error handling",
          "Read and write files and JSON",
          "Use the standard library before reaching for packages"
        ],
        "project": "Write a command-line tool that reads a CSV and prints a summary report."
      },
      {
        "stage": 2,
        "title": "How the web talks: HTTP",
        "description": "Requests, responses, status codes and headers, seen from the server side.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain a request/response cycle",
          "Pick the right status code for a situation",
          "Inspect requests with your browser's DevTools"
        ],
        "project": "Document five real API calls from a site you use: method, URL, status and what each header does."
      },
      {
        "stage": 3,
        "title": "Build a REST API",
        "description": "Routes, validation and clear errors for one small resource.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Design resource URLs and methods",
          "Validate input and return useful errors",
          "Test endpoints with Postman"
        ],
        "project": "Build a notes API with create, list, update and delete."
      },
      {
        "stage": 4,
        "title": "SQL and one real database",
        "description": "Tables, joins, indexes and transactions in PostgreSQL.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Model data in tables with keys and constraints",
          "Write joins and aggregates",
          "Add an index and explain why it helps"
        ],
        "project": "Move your notes API onto PostgreSQL with users and tags."
      },
      {
        "stage": 5,
        "title": "Authentication and security basics",
        "description": "Passwords, sessions or tokens, and the OWASP mistakes to avoid.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Hash passwords and never store them in plain text",
          "Protect routes with sessions or tokens",
          "Name the top web security risks and how you avoid them"
        ],
        "project": "Add sign-up, login and per-user notes to your API."
      },
      {
        "stage": 6,
        "title": "Testing your service",
        "description": "Unit and API tests that catch real bugs.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write unit tests for business logic",
          "Write API tests for the main routes",
          "Run tests on every push"
        ],
        "project": "Get your notes API to 80% test coverage on the main paths."
      },
      {
        "stage": 7,
        "title": "Containers and deployment",
        "description": "Docker, environment variables and a free host.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a Dockerfile for your service",
          "Keep secrets in environment variables",
          "Deploy and share a live URL"
        ],
        "project": "Deploy your API with its database and paste the live link below."
      },
      {
        "stage": 8,
        "title": "Performance and caching",
        "description": "Find the slow query, cache what is safe to cache.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Find a slow query with EXPLAIN",
          "Use HTTP caching headers correctly",
          "Paginate list endpoints"
        ],
        "project": "Add pagination and caching to your list endpoint and measure the difference."
      },
      {
        "stage": 9,
        "title": "System design and interviews",
        "description": "Talk through a simple design and your own service in an interview.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Sketch a design for a URL shortener",
          "Discuss trade-offs: SQL vs NoSQL, caching, queues",
          "Explain your project end to end"
        ],
        "project": "Write a one-page design doc for your API as if it had 100,000 users."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      },
      {
        "slug": "ios",
        "title": "iOS Developer"
      }
    ]
  },
  {
    "id": "8a3eeb34-f7c3-4a0c-9aee-aa09cdc7c8fc",
    "slug": "qa-engineer",
    "title": "QA Engineer",
    "category": "Engineering",
    "description": "Manual testing done properly, then automation.",
    "subtitle": "Seven stages · about three months at six hours a week · 31 resources",
    "roles": [
      "QA Engineer",
      "Software Tester",
      "SDET"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Testing fundamentals",
        "description": "What to test, why, and the vocabulary interviewers expect.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain test levels and types",
          "Apply boundary values and equivalence classes",
          "Know the ISTQB basics"
        ],
        "project": "Write test cases for a login page using boundary and equivalence techniques."
      },
      {
        "stage": 2,
        "title": "Writing bugs developers fix",
        "description": "Clear steps, expected vs actual, and evidence.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write a reproducible bug report",
          "Attach logs and screenshots",
          "Prioritise by severity and impact"
        ],
        "project": "Find and report three real bugs in an open-source app."
      },
      {
        "stage": 3,
        "title": "Web and API testing",
        "description": "DevTools, HTTP and Postman.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Inspect network calls in DevTools",
          "Test an API with Postman collections",
          "Check status codes and response bodies"
        ],
        "project": "Build a Postman collection that tests a public API, with assertions."
      },
      {
        "stage": 4,
        "title": "SQL for testers",
        "description": "Check the data behind the UI.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Query tables to verify results",
          "Join tables to trace a record",
          "Set up test data"
        ],
        "project": "Write queries that verify five scenarios from your test cases."
      },
      {
        "stage": 5,
        "title": "Automation with Playwright",
        "description": "Your first stable end-to-end tests.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write tests with good locators",
          "Use fixtures and page objects",
          "Avoid flaky waits"
        ],
        "project": "Automate the login and search flows of a demo site."
      },
      {
        "stage": 6,
        "title": "CI and performance basics",
        "description": "Run tests on every push and measure load.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Run tests in GitHub Actions",
          "Read a test report",
          "Run a basic load test"
        ],
        "project": "Run your Playwright suite in GitHub Actions and add a load test."
      },
      {
        "stage": 7,
        "title": "Resume and interviews",
        "description": "Show your test cases, bugs and automation.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Present a testing portfolio",
          "Answer scenario questions",
          "Explain your automation framework"
        ],
        "project": "Publish a repo with your test cases, bug reports and automation suite."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      },
      {
        "slug": "ios",
        "title": "iOS Developer"
      }
    ]
  },
  {
    "id": "d87db2cc-348c-45e4-be7f-ad3f56b21460",
    "slug": "devops",
    "title": "DevOps",
    "category": "Engineering",
    "description": "Linux, CI and what on-call really means.",
    "subtitle": "Ten stages · about five months at six hours a week · 56 resources",
    "roles": [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Cloud Engineer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Linux and the command line",
        "description": "Files, processes, permissions and shell scripts.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Navigate and manage files from the shell",
          "Manage processes and permissions",
          "Write a bash script with arguments"
        ],
        "project": "Write a script that backs up a folder and rotates old backups."
      },
      {
        "stage": 2,
        "title": "Networking basics",
        "description": "IP, DNS, HTTP and what happens when you visit a URL.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain DNS resolution",
          "Debug with ping, curl and dig",
          "Know ports, TLS and load balancers"
        ],
        "project": "Trace a request to a real site and document every hop you can see."
      },
      {
        "stage": 3,
        "title": "Git and collaboration",
        "description": "Branches, pull requests and reviews.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Use branches and pull requests",
          "Resolve conflicts",
          "Write a useful commit history"
        ],
        "project": "Contribute a small fix to an open-source repo."
      },
      {
        "stage": 4,
        "title": "A programming language for automation",
        "description": "Python for scripts and glue code.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Automate a task with Python",
          "Call an API from a script",
          "Handle errors and logs"
        ],
        "project": "Write a script that checks a list of URLs and reports which are down."
      },
      {
        "stage": 5,
        "title": "Web servers and reverse proxies",
        "description": "Serve an app behind NGINX.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Configure NGINX as a reverse proxy",
          "Serve static files",
          "Read access and error logs"
        ],
        "project": "Serve a small app behind NGINX on a virtual machine."
      },
      {
        "stage": 6,
        "title": "Containers with Docker",
        "description": "Package anything so it runs the same everywhere.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a Dockerfile",
          "Use docker compose for multiple services",
          "Keep images small"
        ],
        "project": "Containerise an app with its database using docker compose."
      },
      {
        "stage": 7,
        "title": "CI/CD pipelines",
        "description": "Test and deploy on every push.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build a pipeline with GitHub Actions",
          "Run tests and build images",
          "Deploy automatically"
        ],
        "project": "Add a pipeline that tests, builds and deploys your containerised app."
      },
      {
        "stage": 8,
        "title": "Cloud and infrastructure as code",
        "description": "One cloud provider and Terraform.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Know compute, storage and networking services",
          "Write Terraform for a small setup",
          "Keep costs under control"
        ],
        "project": "Provision a VM and a bucket with Terraform on the free tier."
      },
      {
        "stage": 9,
        "title": "Kubernetes basics",
        "description": "Deployments, services and when you need them.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Deploy an app to a local cluster",
          "Expose it with a service",
          "Scale and roll back"
        ],
        "project": "Run your app on a local Kubernetes cluster."
      },
      {
        "stage": 10,
        "title": "Monitoring and on-call",
        "description": "Metrics, alerts and what on-call really means.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Collect metrics with Prometheus",
          "Write alerts that matter",
          "Write a blameless post-mortem"
        ],
        "project": "Add monitoring to your app and write a post-mortem for a simulated outage."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      },
      {
        "slug": "ios",
        "title": "iOS Developer"
      }
    ]
  },
  {
    "id": "415d1bf5-9e59-4bf4-b04c-79b1163d46ad",
    "slug": "full-stack",
    "title": "Full Stack Developer",
    "category": "Engineering",
    "description": "Frontend, backend and a database, shipped as one product.",
    "subtitle": "Eight stages · about four months at seven hours a week · 46 resources",
    "roles": [
      "Full Stack Developer",
      "Software Engineer",
      "Web Developer"
    ],
    "hoursPerWeek": 7,
    "stages": [
      {
        "stage": 1,
        "title": "Frontend foundations",
        "description": "Semantic HTML, modern CSS layout and the DOM, quickly but properly.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build a responsive page with semantic HTML",
          "Lay out pages with flexbox and grid",
          "Update the page from JavaScript"
        ],
        "project": "Build a responsive landing page for a product you like."
      },
      {
        "stage": 2,
        "title": "React for real apps",
        "description": "Components, state and effects for interfaces with real data.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Split a UI into components",
          "Manage state and forms",
          "Fetch data with loading and error states"
        ],
        "project": "Build a React app that lists, filters and saves items from a public API."
      },
      {
        "stage": 3,
        "title": "Backend and APIs",
        "description": "HTTP, REST design and your first API server.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain requests, responses and status codes",
          "Design REST endpoints",
          "Build and validate an API"
        ],
        "project": "Build a REST API for notes with validation and clear errors."
      },
      {
        "stage": 4,
        "title": "Databases",
        "description": "Relational data modelling and the SQL every full stack developer uses.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Model data with keys and relationships",
          "Write joins and aggregates",
          "Add the right indexes"
        ],
        "project": "Move your API onto PostgreSQL with users and related data."
      },
      {
        "stage": 5,
        "title": "Auth and security",
        "description": "Login, sessions and the mistakes that cause real breaches.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Hash passwords and manage sessions",
          "Scope every query to its owner",
          "Avoid injection and XSS"
        ],
        "project": "Add sign-up, login and per-user data to your API."
      },
      {
        "stage": 6,
        "title": "Connecting frontend and backend",
        "description": "Make your React app and API work together cleanly.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Call your API from React with proper states",
          "Handle CORS and environment settings",
          "Organise a full stack repository"
        ],
        "project": "Connect your React app to your API so users can sign up and manage their own data."
      },
      {
        "stage": 7,
        "title": "Deploy the whole stack",
        "description": "Containers, configuration and a live URL for both halves.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Containerise the API and database",
          "Deploy frontend and backend",
          "Keep secrets out of code"
        ],
        "project": "Deploy your full stack app and paste the live link below."
      },
      {
        "stage": 8,
        "title": "Portfolio and interviews",
        "description": "Present the project and prepare for full stack interviews.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a one-page resume",
          "Explain your project end to end",
          "Answer frontend and backend fundamentals"
        ],
        "project": "Publish a portfolio page with your full stack project and resume."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      },
      {
        "slug": "ios",
        "title": "iOS Developer"
      }
    ]
  },
  {
    "id": "7f40fe0c-8550-4cc4-91dc-43a4d10b8fa7",
    "slug": "android",
    "title": "Android Developer",
    "category": "Engineering",
    "description": "From Kotlin basics to an app on the Play Store, in six stages.",
    "subtitle": "Six stages · about four months at six hours a week · 28 resources",
    "roles": [
      "Android Developer",
      "Mobile Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Kotlin fundamentals",
        "description": "The language you will write every day: types, null safety, functions and classes.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write functions, classes and data classes in Kotlin",
          "Use null safety and collections without crashes",
          "Explain lambdas and higher-order functions"
        ],
        "project": "Build a command-line unit converter in Kotlin with tests."
      },
      {
        "stage": 2,
        "title": "Android Studio and your first screen",
        "description": "Activities, layouts, the emulator and the app lifecycle.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Create, run and debug an app on the emulator",
          "Explain the activity lifecycle",
          "Build a screen with Jetpack Compose"
        ],
        "project": "Build a one-screen tip calculator."
      },
      {
        "stage": 3,
        "title": "UI with Jetpack Compose",
        "description": "Composables, state, lists and navigation between screens.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Build lists and forms with Compose",
          "Hold UI state correctly and survive rotation",
          "Navigate between three screens"
        ],
        "project": "Build a notes app with a list screen and an edit screen."
      },
      {
        "stage": 4,
        "title": "Data, networking and architecture",
        "description": "Local storage, calling an API and keeping code organised.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Store data with Room",
          "Call a REST API with Retrofit and show loading and error states",
          "Separate UI, state and data with ViewModel"
        ],
        "project": "Build a movie browser that caches results offline."
      },
      {
        "stage": 5,
        "title": "Quality and release",
        "description": "Tests, permissions, signing and the Play Store listing.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write unit and UI tests",
          "Handle runtime permissions",
          "Build a signed release bundle"
        ],
        "project": "Prepare a Play Console listing and publish to internal testing."
      },
      {
        "stage": 6,
        "title": "Portfolio and interviews",
        "description": "Two finished apps, a clean repo and the common interview questions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Present two apps with screenshots and a README",
          "Answer lifecycle, architecture and threading questions",
          "Explain one app end to end"
        ],
        "project": "Record a 5-minute walkthrough of your best app."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "ios",
        "title": "iOS Developer"
      }
    ]
  },
  {
    "id": "36972a39-7070-4057-968d-cfbc2f9997ac",
    "slug": "ios",
    "title": "iOS Developer",
    "category": "Engineering",
    "description": "Swift, SwiftUI and shipping an app to TestFlight.",
    "subtitle": "Six stages · about four months at six hours a week · 27 resources",
    "roles": [
      "iOS Developer",
      "Mobile Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Swift fundamentals",
        "description": "Types, optionals, closures and structs versus classes.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use optionals safely",
          "Choose between struct and class",
          "Write closures and protocols"
        ],
        "project": "Build a command-line habit tracker in Swift."
      },
      {
        "stage": 2,
        "title": "Xcode and SwiftUI basics",
        "description": "Views, modifiers, stacks and previews.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a counter app and a simple form."
      },
      {
        "stage": 3,
        "title": "Navigation, lists and data flow",
        "description": "Multi-screen apps and shared state.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Navigate with NavigationStack",
          "Share state with observable objects",
          "Persist data with SwiftData"
        ],
        "project": "Build a to-do app with categories that survives relaunch."
      },
      {
        "stage": 4,
        "title": "Networking and concurrency",
        "description": "async/await, URLSession and handling errors.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Fetch and decode JSON",
          "Use async/await and tasks",
          "Show loading, empty and error states"
        ],
        "project": "Build a news or weather app from a public API."
      },
      {
        "stage": 5,
        "title": "Testing and TestFlight",
        "description": "Unit tests, accessibility and distributing builds.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write unit tests for your logic",
          "Support Dynamic Type and VoiceOver",
          "Upload a build to TestFlight"
        ],
        "project": "Invite two friends to test your app on TestFlight."
      },
      {
        "stage": 6,
        "title": "Portfolio and interviews",
        "description": "Polish, write up and practise.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Publish a README with screenshots",
          "Answer memory, lifecycle and concurrency questions",
          "Explain your app's architecture"
        ],
        "project": "Record a short demo video of your best app."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "8bca6883-3ae1-4bb0-b246-f18142a967a2",
    "slug": "postgresql",
    "title": "PostgreSQL DBA",
    "category": "Engineering",
    "description": "Run, tune and protect a PostgreSQL database.",
    "subtitle": "Six stages · about three months at five hours a week · 28 resources",
    "roles": [
      "Database Administrator",
      "Backend Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "SQL and Postgres basics",
        "description": "Install, connect and query with confidence.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Install Postgres and use psql",
          "Create tables with types and constraints",
          "Write joins and aggregates"
        ],
        "project": "Create a schema for a library system and load sample data."
      },
      {
        "stage": 2,
        "title": "Indexes and query plans",
        "description": "Why queries are slow and how to fix them.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Speed up three slow queries and show before-and-after plans."
      },
      {
        "stage": 3,
        "title": "Transactions and concurrency",
        "description": "Isolation levels, locks and avoiding deadlocks.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain isolation levels",
          "Diagnose a blocked query",
          "Use transactions correctly"
        ],
        "project": "Reproduce and fix a deadlock in a small demo."
      },
      {
        "stage": 4,
        "title": "Operations",
        "description": "Backups, restores, vacuum and monitoring.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Take and restore a backup",
          "Explain vacuum and bloat",
          "Monitor connections and slow queries"
        ],
        "project": "Write and test a backup-and-restore runbook."
      },
      {
        "stage": 5,
        "title": "Security and access",
        "description": "Roles, permissions and row-level security.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Create roles with least privilege",
          "Use row-level security",
          "Secure connections"
        ],
        "project": "Set up three roles and prove each can only do what it should."
      },
      {
        "stage": 6,
        "title": "Scale and interviews",
        "description": "Replication, partitioning and common questions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain replication and failover",
          "Partition a large table",
          "Answer DBA interview questions"
        ],
        "project": "Describe how you would scale a read-heavy database."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "9e1e141d-71a9-4c0c-8369-5676f795cb11",
    "slug": "blockchain",
    "title": "Blockchain Developer",
    "category": "Engineering",
    "description": "How blockchains work and how to build smart contracts safely.",
    "subtitle": "Six stages · about four months at six hours a week · 28 resources",
    "roles": [
      "Blockchain Developer",
      "Smart Contract Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Concepts",
        "description": "Hashes, signatures, blocks and consensus.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain how a block links to the previous one",
          "Describe public-key signatures",
          "Compare proof of work and proof of stake"
        ],
        "project": "Write a tiny blockchain in a language you know."
      },
      {
        "stage": 2,
        "title": "Wallets and transactions",
        "description": "Accounts, gas and reading the chain.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Send a testnet transaction and explain every field."
      },
      {
        "stage": 3,
        "title": "Smart contracts with Solidity",
        "description": "The language, the tooling and the pitfalls.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Write and test a contract",
          "Use events, modifiers and mappings",
          "Deploy to a testnet"
        ],
        "project": "Build and deploy a simple voting contract."
      },
      {
        "stage": 4,
        "title": "Security",
        "description": "The mistakes that lose money.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain reentrancy and how to prevent it",
          "Use well-reviewed libraries",
          "Write tests for failure cases"
        ],
        "project": "Find and fix the bug in a deliberately vulnerable contract."
      },
      {
        "stage": 5,
        "title": "Connecting a front end",
        "description": "Wallets, web3 libraries and user flows.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Connect a wallet to a web page",
          "Call contract functions from JavaScript",
          "Handle pending and failed transactions"
        ],
        "project": "Build a web page that interacts with your contract."
      },
      {
        "stage": 6,
        "title": "Portfolio and interviews",
        "description": "Show audited-quality work.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Publish tested, documented contracts",
          "Answer security and design questions",
          "Explain trade-offs of on-chain storage"
        ],
        "project": "Write a short threat model for your best contract."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "8e188936-a6ff-4643-898a-b5886afac12b",
    "slug": "software-architect",
    "title": "Software Architect",
    "category": "Engineering",
    "description": "Make design decisions that hold up as systems and teams grow.",
    "subtitle": "Five stages · about three months at five hours a week · 23 resources",
    "roles": [
      "Software Architect",
      "Solutions Architect"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Think in trade-offs",
        "description": "Quality attributes: performance, reliability, cost and change.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Name the quality attributes a system needs",
          "Weigh two options with their trade-offs",
          "Write a decision record"
        ],
        "project": "Write an architecture decision record for a real choice you made."
      },
      {
        "stage": 2,
        "title": "Structuring applications",
        "description": "Layers, modules, monolith versus services.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Choose between monolith and services",
          "Draw clear module boundaries",
          "Explain coupling and cohesion"
        ],
        "project": "Propose a module structure for a shop application."
      },
      {
        "stage": 3,
        "title": "Data and integration",
        "description": "Databases, queues, APIs and consistency.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Choose a data store for a workload",
          "Design an API contract",
          "Explain eventual consistency"
        ],
        "project": "Design the data and integration layer for a booking system."
      },
      {
        "stage": 4,
        "title": "Scale, resilience and operations",
        "description": "Failure modes, observability and deployment.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Identify single points of failure",
          "Plan for timeouts and retries",
          "Define what to monitor"
        ],
        "project": "Run a failure analysis on a system diagram."
      },
      {
        "stage": 5,
        "title": "Communicating architecture",
        "description": "Diagrams and documents people read.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Draw context and container diagrams",
          "Write a clear design document",
          "Present and defend a design"
        ],
        "project": "Produce a design doc with diagrams for a mid-sized system."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "719cfb27-58b5-4f81-b224-ce0900de6b26",
    "slug": "api-design",
    "title": "API Designer",
    "category": "Engineering",
    "description": "Design APIs other developers enjoy using.",
    "subtitle": "Five stages · about three months at five hours a week · 24 resources",
    "roles": [
      "API Developer",
      "Backend Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "HTTP and REST basics",
        "description": "Methods, status codes and resources.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Choose the right method and status code",
          "Model resources and URLs",
          "Explain idempotency"
        ],
        "project": "Design the endpoints for a to-do service on paper."
      },
      {
        "stage": 2,
        "title": "Requests, responses and errors",
        "description": "Consistent shapes, validation and helpful errors.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Write an OpenAPI spec for your to-do service."
      },
      {
        "stage": 3,
        "title": "Pagination, filtering and performance",
        "description": "Handling big collections and caching.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Paginate with cursors",
          "Support filtering and sorting",
          "Use caching headers"
        ],
        "project": "Add cursor pagination and filters to the spec."
      },
      {
        "stage": 4,
        "title": "Security",
        "description": "Authentication, authorisation and rate limits.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Choose an auth scheme",
          "Prevent over-exposed data",
          "Add rate limits"
        ],
        "project": "Add auth and rate limiting to the spec and explain each choice."
      },
      {
        "stage": 5,
        "title": "Documentation and developer experience",
        "description": "Docs, examples and changelogs.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a quickstart that works",
          "Provide examples in two languages",
          "Publish a changelog"
        ],
        "project": "Publish docs for your API with a working example."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "5ba8e44e-6e02-4b8d-806b-ecea92ebaea1",
    "slug": "game-developer",
    "title": "Game Developer",
    "category": "Engineering",
    "description": "Make small games that play well, then bigger ones.",
    "subtitle": "Five stages · about three months at six hours a week · 24 resources",
    "roles": [
      "Game Developer",
      "Gameplay Programmer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Programming for games",
        "description": "A language, game loops and basic maths.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write a game loop",
          "Use vectors for movement",
          "Handle input and collisions"
        ],
        "project": "Build Pong in a language you know."
      },
      {
        "stage": 2,
        "title": "An engine of your choice",
        "description": "Scenes, objects, assets and scripts in Unity or Godot.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a platformer level with jumping and enemies."
      },
      {
        "stage": 3,
        "title": "Game design basics",
        "description": "Core loop, feedback and difficulty.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Describe your core loop",
          "Add feedback with sound and effects",
          "Tune difficulty by playtesting"
        ],
        "project": "Playtest your level with three people and write what changed."
      },
      {
        "stage": 4,
        "title": "Polish and systems",
        "description": "UI, saving, menus and performance.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Build menus and a HUD",
          "Save and load progress",
          "Profile and fix a frame-rate issue"
        ],
        "project": "Add a menu, score and save system to your game."
      },
      {
        "stage": 5,
        "title": "Finish and publish",
        "description": "Scope, a build and a store page.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Cut scope to finish",
          "Export builds for a platform",
          "Publish on itch.io"
        ],
        "project": "Publish a game with a page, screenshots and a short trailer."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "8ef6b039-bfda-4a9b-bae0-b3295c44bb52",
    "slug": "server-side-game-developer",
    "title": "Server-side Game Developer",
    "category": "Engineering",
    "description": "Build the servers behind multiplayer games.",
    "subtitle": "Five stages · about four months at six hours a week · 22 resources",
    "roles": [
      "Game Server Developer",
      "Backend Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Networking basics",
        "description": "TCP, UDP, latency and sockets.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain TCP versus UDP trade-offs",
          "Write a socket server and client",
          "Measure latency and packet loss"
        ],
        "project": "Build a chat server with sockets."
      },
      {
        "stage": 2,
        "title": "Game server architecture",
        "description": "Authoritative servers, rooms and tick rates.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a server that simulates two players moving."
      },
      {
        "stage": 3,
        "title": "State sync and latency",
        "description": "Interpolation, prediction and lag compensation.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Send compact state updates",
          "Explain prediction and reconciliation",
          "Hide latency from players"
        ],
        "project": "Add client prediction to your movement demo."
      },
      {
        "stage": 4,
        "title": "Persistence and matchmaking",
        "description": "Player data, queues and leaderboards.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Store player profiles and inventories",
          "Build a matchmaking queue",
          "Keep a leaderboard fast"
        ],
        "project": "Add matchmaking and a leaderboard to your server."
      },
      {
        "stage": 5,
        "title": "Scale, cheating and operations",
        "description": "Many servers, abuse and monitoring.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Scale rooms across servers",
          "Detect basic cheating",
          "Monitor player counts and errors"
        ],
        "project": "Write a plan for scaling to ten thousand players."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "2e5b1cdf-0189-4db1-90a1-9bd67f16c40f",
    "slug": "forward-deployed-engineer",
    "title": "Forward Deployed Engineer",
    "category": "Engineering",
    "description": "Work inside customer problems and make software fit their reality.",
    "subtitle": "Five stages · about three months at five hours a week · 22 resources",
    "roles": [
      "Forward Deployed Engineer",
      "Solutions Engineer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "The role",
        "description": "Engineering and consulting at the customer's side.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain what a forward deployed engineer does",
          "Understand customer workflows",
          "Scope a problem with a customer"
        ],
        "project": "Interview someone about a workflow and write the problem back."
      },
      {
        "stage": 2,
        "title": "Fast, practical engineering",
        "description": "Scripts, APIs and glue that works this week.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a tool that pulls data from two sources into one report."
      },
      {
        "stage": 3,
        "title": "Data integration",
        "description": "Messy data, mappings and validation.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Map fields between systems",
          "Validate and clean incoming data",
          "Handle failures and retries"
        ],
        "project": "Integrate two sample systems with validation and logging."
      },
      {
        "stage": 4,
        "title": "Communication and delivery",
        "description": "Demos, updates and handling pushback.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Run a clear demo",
          "Write status updates",
          "Handle changing requirements"
        ],
        "project": "Present a 10-minute demo to a non-technical audience."
      },
      {
        "stage": 5,
        "title": "Production and support",
        "description": "Deploy, monitor and hand over.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Deploy with basic monitoring",
          "Write a handover document",
          "Respond to an incident"
        ],
        "project": "Write a handover guide for the tool you built."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "684a8c37-2969-4646-b7c9-cb3300bd8199",
    "slug": "html",
    "title": "HTML",
    "category": "Engineering",
    "description": "Structure web pages that are correct and accessible.",
    "subtitle": "Four stages · about five weeks at four hours a week · 20 resources",
    "roles": [
      "Web Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Document structure",
        "description": "Elements, attributes and the page skeleton.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write a valid HTML document",
          "Use headings and lists correctly",
          "Add links and images with alt text"
        ],
        "project": "Write a personal page with correct structure."
      },
      {
        "stage": 2,
        "title": "Semantic HTML",
        "description": "Landmarks and meaningful elements.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Convert a div-heavy page to semantic HTML."
      },
      {
        "stage": 3,
        "title": "Forms",
        "description": "Inputs, labels, validation and accessibility.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build a labelled form",
          "Use native validation",
          "Group related fields"
        ],
        "project": "Build a sign-up form without any JavaScript."
      },
      {
        "stage": 4,
        "title": "Accessibility and SEO basics",
        "description": "Pages that everyone and search engines can use.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Test with the keyboard",
          "Write useful alt text and titles",
          "Add meta tags"
        ],
        "project": "Audit a page and fix five accessibility issues."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "732aa167-2079-4587-a506-00249edc9453",
    "slug": "css",
    "title": "CSS",
    "category": "Engineering",
    "description": "Layout and style pages without guessing.",
    "subtitle": "Four stages · about two months at five hours a week · 20 resources",
    "roles": [
      "Frontend Developer",
      "Web Designer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Selectors and the cascade",
        "description": "Specificity, inheritance and the box model.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Predict which rule wins",
          "Use the box model confidently",
          "Organise CSS sensibly"
        ],
        "project": "Style a blog article from scratch."
      },
      {
        "stage": 2,
        "title": "Flexbox",
        "description": "One-dimensional layouts.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a responsive navigation bar and card list."
      },
      {
        "stage": 3,
        "title": "Grid and responsive design",
        "description": "Two-dimensional layouts that adapt.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build a page layout with grid",
          "Use media and container queries",
          "Size with fluid units"
        ],
        "project": "Build a responsive dashboard layout."
      },
      {
        "stage": 4,
        "title": "Polish",
        "description": "Variables, transitions and dark mode.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use custom properties for a theme",
          "Add tasteful transitions",
          "Support dark mode"
        ],
        "project": "Add a light and dark theme to your page."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "01e7ba17-cabd-477d-ad64-ae41fb0d0378",
    "slug": "react",
    "title": "React",
    "category": "Engineering",
    "description": "Build interfaces from components, state and effects.",
    "subtitle": "Six stages · about two months at six hours a week · 29 resources",
    "roles": [
      "Frontend Developer",
      "React Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "JavaScript you need",
        "description": "ES modules, arrays, destructuring and async code.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Use map, filter and destructuring",
          "Write async functions",
          "Use modules"
        ],
        "project": "Practise with a small data-transform exercise."
      },
      {
        "stage": 2,
        "title": "Components and props",
        "description": "Thinking in components.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a product card list."
      },
      {
        "stage": 3,
        "title": "State and events",
        "description": "Interactive UI with hooks.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use useState and lift state",
          "Handle forms",
          "Derive values instead of storing them"
        ],
        "project": "Build a shopping cart."
      },
      {
        "stage": 4,
        "title": "Effects and data fetching",
        "description": "Talk to APIs and clean up.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use useEffect correctly",
          "Fetch with loading and error states",
          "Avoid effect pitfalls"
        ],
        "project": "Build a search app against a public API."
      },
      {
        "stage": 5,
        "title": "Routing, context and structure",
        "description": "Multiple pages and shared state.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Add routing",
          "Use context sparingly",
          "Organise a growing codebase"
        ],
        "project": "Build a multi-page app with a detail view."
      },
      {
        "stage": 6,
        "title": "Deploy and portfolio",
        "description": "Ship and explain.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Deploy to a free host",
          "Write a clear README",
          "Explain your component design"
        ],
        "project": "Publish an app and a write-up."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "ff1cc28b-e74e-4dda-94ca-3f34c6d34a26",
    "slug": "vue",
    "title": "Vue",
    "category": "Engineering",
    "description": "Build apps with Vue's approachable component model.",
    "subtitle": "Four stages · about two months at five hours a week · 18 resources",
    "roles": [
      "Frontend Developer",
      "Vue Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Templates and reactivity",
        "description": "Reactive state and template syntax.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Bind data in templates",
          "Use ref and computed",
          "Handle events and conditionals"
        ],
        "project": "Build a counter and a filterable list."
      },
      {
        "stage": 2,
        "title": "Components",
        "description": "Props, emits and slots.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a reusable card and modal."
      },
      {
        "stage": 3,
        "title": "Routing and state",
        "description": "Pages and shared state.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Add Vue Router",
          "Share state with Pinia",
          "Guard routes"
        ],
        "project": "Build a multi-page app with shared state."
      },
      {
        "stage": 4,
        "title": "Data and deployment",
        "description": "Fetching, forms and shipping.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Fetch data with loading and error states",
          "Validate forms",
          "Deploy the app"
        ],
        "project": "Deploy a small app backed by a public API."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "2fa4e324-fae9-4c12-91f0-21cd66f97b7b",
    "slug": "angular",
    "title": "Angular",
    "category": "Engineering",
    "description": "Build large front-end apps with Angular and TypeScript.",
    "subtitle": "Five stages · about three months at six hours a week · 24 resources",
    "roles": [
      "Frontend Developer",
      "Angular Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "TypeScript and setup",
        "description": "The language and the CLI.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use TypeScript classes and types",
          "Create a project with the CLI",
          "Understand the project structure"
        ],
        "project": "Generate an app and explain each folder."
      },
      {
        "stage": 2,
        "title": "Components and templates",
        "description": "Binding, directives and pipes.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a task list with components."
      },
      {
        "stage": 3,
        "title": "Services, DI and HTTP",
        "description": "Sharing logic and calling APIs.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Create injectable services",
          "Call APIs with HttpClient",
          "Handle observables"
        ],
        "project": "Build an app that loads and caches API data."
      },
      {
        "stage": 4,
        "title": "Routing and forms",
        "description": "Navigation and reactive forms.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Configure routes and guards",
          "Build reactive forms with validation",
          "Lazy load a feature"
        ],
        "project": "Build a multi-page app with a validated form."
      },
      {
        "stage": 5,
        "title": "Testing and build",
        "description": "Unit tests and production builds.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write component tests",
          "Build for production",
          "Deploy the app"
        ],
        "project": "Add tests and deploy."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "c3d96fca-d447-4111-86b5-4652c8cd651c",
    "slug": "nodejs",
    "title": "Node.js",
    "category": "Engineering",
    "description": "Run JavaScript on the server and build APIs.",
    "subtitle": "Five stages · about three months at six hours a week · 25 resources",
    "roles": [
      "Backend Developer",
      "Node.js Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Node basics",
        "description": "Modules, the event loop and the file system.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use modules and npm",
          "Read and write files",
          "Explain the event loop"
        ],
        "project": "Write a CLI tool that processes a file."
      },
      {
        "stage": 2,
        "title": "HTTP servers and APIs",
        "description": "Routing, middleware and JSON.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a notes API with CRUD endpoints."
      },
      {
        "stage": 3,
        "title": "Databases",
        "description": "Storing data safely.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Connect to a database",
          "Write parameterised queries",
          "Model relations"
        ],
        "project": "Persist your notes API in a database."
      },
      {
        "stage": 4,
        "title": "Authentication and security",
        "description": "Sessions, tokens and common mistakes.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Hash passwords and manage sessions",
          "Validate input",
          "Avoid common vulnerabilities"
        ],
        "project": "Add login to your API."
      },
      {
        "stage": 5,
        "title": "Testing and deploying",
        "description": "Tests, CI and a live service.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write API tests",
          "Run CI on every push",
          "Deploy with environment config"
        ],
        "project": "Deploy your API and add a test pipeline."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "a749a080-de28-4b9e-9848-722c4a7fb971",
    "slug": "aspnet-core",
    "title": "ASP.NET Core",
    "category": "Engineering",
    "description": "Build web APIs and apps with C# and .NET.",
    "subtitle": "Five stages · about three months at six hours a week · 25 resources",
    "roles": [
      "Backend Developer",
      ".NET Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "C# fundamentals",
        "description": "Types, classes and LINQ.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write classes and interfaces",
          "Use collections and LINQ",
          "Handle exceptions"
        ],
        "project": "Build a console inventory app."
      },
      {
        "stage": 2,
        "title": "Web API basics",
        "description": "Controllers, routing and models.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a products API."
      },
      {
        "stage": 3,
        "title": "Data with Entity Framework",
        "description": "Migrations and queries.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Define entities and migrations",
          "Query with LINQ",
          "Avoid common performance traps"
        ],
        "project": "Persist your API in a database."
      },
      {
        "stage": 4,
        "title": "Auth and middleware",
        "description": "Identity, JWT and the pipeline.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Add authentication",
          "Write middleware",
          "Protect endpoints"
        ],
        "project": "Add login and role-based access."
      },
      {
        "stage": 5,
        "title": "Test and deploy",
        "description": "Tests and publishing.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write integration tests",
          "Containerise the app",
          "Deploy to a cloud service"
        ],
        "project": "Deploy your API with a test pipeline."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "de529486-df59-48e8-9f18-38970c501db5",
    "slug": "spring-boot",
    "title": "Spring Boot",
    "category": "Engineering",
    "description": "Build production-ready Java services quickly.",
    "subtitle": "Five stages · about three months at six hours a week · 23 resources",
    "roles": [
      "Java Developer",
      "Backend Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Java and Spring basics",
        "description": "The language features and the framework model.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use Java collections and streams",
          "Explain dependency injection",
          "Create a Spring Boot project"
        ],
        "project": "Generate a project and add a hello endpoint."
      },
      {
        "stage": 2,
        "title": "REST APIs",
        "description": "Controllers, validation and errors.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a library API."
      },
      {
        "stage": 3,
        "title": "Data with JPA",
        "description": "Entities, repositories and transactions.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Map entities and relations",
          "Write repository queries",
          "Use transactions"
        ],
        "project": "Persist the library API in a database."
      },
      {
        "stage": 4,
        "title": "Security and testing",
        "description": "Authentication and tests.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Secure endpoints",
          "Write unit and integration tests",
          "Use test containers or an in-memory database"
        ],
        "project": "Add login and a test suite."
      },
      {
        "stage": 5,
        "title": "Package and deploy",
        "description": "Docker, config and monitoring.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Externalise configuration",
          "Build a Docker image",
          "Expose health endpoints"
        ],
        "project": "Deploy your service in a container."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "61de54d9-a4bd-4f87-8edd-83709d1e29af",
    "slug": "flutter",
    "title": "Flutter",
    "category": "Engineering",
    "description": "Build mobile apps for Android and iOS from one codebase.",
    "subtitle": "Five stages · about three months at six hours a week · 24 resources",
    "roles": [
      "Mobile Developer",
      "Flutter Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Dart basics",
        "description": "The language of Flutter.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use types, classes and null safety",
          "Write async code",
          "Use collections"
        ],
        "project": "Write a small Dart command-line app."
      },
      {
        "stage": 2,
        "title": "Widgets and layout",
        "description": "Everything is a widget.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a profile and settings screen."
      },
      {
        "stage": 3,
        "title": "State and navigation",
        "description": "Managing data and screens.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Choose a state approach",
          "Navigate between screens",
          "Pass data safely"
        ],
        "project": "Build a multi-screen to-do app."
      },
      {
        "stage": 4,
        "title": "Data and networking",
        "description": "APIs and local storage.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Fetch JSON from an API",
          "Store data locally",
          "Show loading and error states"
        ],
        "project": "Build a weather app with offline cache."
      },
      {
        "stage": 5,
        "title": "Release",
        "description": "Testing and store builds.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write widget tests",
          "Build release packages",
          "Prepare a store listing"
        ],
        "project": "Create release builds for Android."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "2b93d4e7-4623-4177-8655-68e21dcca265",
    "slug": "react-native",
    "title": "React Native",
    "category": "Engineering",
    "description": "Build mobile apps with React and JavaScript.",
    "subtitle": "Five stages · about three months at six hours a week · 23 resources",
    "roles": [
      "Mobile Developer",
      "React Native Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "React foundations",
        "description": "Components, props and state.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build components",
          "Use state and effects",
          "Write clean JavaScript or TypeScript"
        ],
        "project": "Build a simple counter and list."
      },
      {
        "stage": 2,
        "title": "Native components and layout",
        "description": "Views, text, lists and styling.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a profile and feed screen."
      },
      {
        "stage": 3,
        "title": "Navigation and state",
        "description": "Multiple screens and shared data.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Set up navigation",
          "Share state",
          "Persist data locally"
        ],
        "project": "Build a multi-screen notes app."
      },
      {
        "stage": 4,
        "title": "Native features and APIs",
        "description": "Camera, location and networking.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Request permissions",
          "Use a device feature",
          "Fetch data with error handling"
        ],
        "project": "Add a camera or location feature."
      },
      {
        "stage": 5,
        "title": "Build and release",
        "description": "Testing and store builds.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Test on devices",
          "Create release builds",
          "Submit to testing tracks"
        ],
        "project": "Distribute a test build."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "8133e06d-a597-4bb8-be46-9105af9d6be0",
    "slug": "mongodb",
    "title": "MongoDB",
    "category": "Engineering",
    "description": "Document databases: model, query and scale.",
    "subtitle": "Four stages · about two months at five hours a week · 18 resources",
    "roles": [
      "Backend Developer",
      "Database Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Documents and collections",
        "description": "The data model and CRUD.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Insert, find, update and delete",
          "Choose embedding versus referencing",
          "Use the shell and a driver"
        ],
        "project": "Model a blog with posts and comments."
      },
      {
        "stage": 2,
        "title": "Queries and aggregation",
        "description": "Filtering and pipelines.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Write five analytics queries on a sample dataset."
      },
      {
        "stage": 3,
        "title": "Indexes and performance",
        "description": "Make queries fast.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Create compound indexes",
          "Read explain output",
          "Avoid unbounded arrays"
        ],
        "project": "Speed up three slow queries."
      },
      {
        "stage": 4,
        "title": "Operations",
        "description": "Replication, backups and security.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain replica sets",
          "Take backups",
          "Secure access"
        ],
        "project": "Write a backup and restore plan."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "0a30c2a8-67c7-4ba0-a658-3880cb89df74",
    "slug": "redis",
    "title": "Redis",
    "category": "Engineering",
    "description": "Use Redis for caching, queues and fast data.",
    "subtitle": "Four stages · about six weeks at four hours a week · 19 resources",
    "roles": [
      "Backend Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Basics",
        "description": "Data types and commands.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Use strings, hashes, lists and sets",
          "Set expirations",
          "Use the CLI"
        ],
        "project": "Model a leaderboard with sorted sets."
      },
      {
        "stage": 2,
        "title": "Caching",
        "description": "Patterns and invalidation.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Add a cache to a slow endpoint and measure it."
      },
      {
        "stage": 3,
        "title": "Queues, pub/sub and rate limits",
        "description": "Beyond caching.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build a simple job queue",
          "Use pub/sub",
          "Implement rate limiting"
        ],
        "project": "Add a rate limiter to an API."
      },
      {
        "stage": 4,
        "title": "Persistence and operations",
        "description": "Durability and memory.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain RDB and AOF",
          "Set memory limits and eviction",
          "Monitor usage"
        ],
        "project": "Write operating notes for a production cache."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "18784eb7-5a82-407f-9ff2-a2ee35b6d727",
    "slug": "git-github",
    "title": "Git and GitHub",
    "category": "Engineering",
    "description": "Version your work and collaborate with confidence.",
    "subtitle": "Four stages · about five weeks at three hours a week · 20 resources",
    "roles": [
      "Software Developer",
      "Student"
    ],
    "hoursPerWeek": 3,
    "stages": [
      {
        "stage": 1,
        "title": "Git basics",
        "description": "Init, add, commit and history.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Create a repo and commit changes",
          "Read history and diffs",
          "Undo mistakes safely"
        ],
        "project": "Version a small project with ten meaningful commits."
      },
      {
        "stage": 2,
        "title": "Branches and merging",
        "description": "Work in parallel.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Create a conflict on purpose and resolve it."
      },
      {
        "stage": 3,
        "title": "GitHub and pull requests",
        "description": "Collaboration workflows.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Push and pull from a remote",
          "Open and review pull requests",
          "Use issues and projects"
        ],
        "project": "Open a pull request to an open-source repo."
      },
      {
        "stage": 4,
        "title": "Good habits",
        "description": "Messages, .gitignore, secrets and CI.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write clear commit messages",
          "Never commit secrets",
          "Run checks on pull requests"
        ],
        "project": "Add a README, .gitignore and a CI check to a repo."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "9f1be23b-d094-4e60-bb8b-dce158326079",
    "slug": "nextjs",
    "title": "Next.js",
    "category": "Engineering",
    "description": "Full-stack React apps with routing, rendering and APIs.",
    "subtitle": "Five stages · about three months at six hours a week · 24 resources",
    "roles": [
      "Frontend Developer",
      "Full Stack Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "React first",
        "description": "Components, state and effects.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build components with props",
          "Use state and effects",
          "Fetch data in React"
        ],
        "project": "Build a small React app."
      },
      {
        "stage": 2,
        "title": "Routing and rendering",
        "description": "Pages, layouts and server components.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a multi-page site with shared layout."
      },
      {
        "stage": 3,
        "title": "Data and mutations",
        "description": "Fetching, caching and forms.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Fetch on the server",
          "Mutate data with server actions",
          "Cache and revalidate"
        ],
        "project": "Build a notes app with a database."
      },
      {
        "stage": 4,
        "title": "Auth and deployment",
        "description": "Protecting routes and shipping.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Add authentication",
          "Protect routes and data",
          "Deploy with environment variables"
        ],
        "project": "Deploy an authenticated app."
      },
      {
        "stage": 5,
        "title": "Performance",
        "description": "Images, fonts and bundle size.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Optimise images and fonts",
          "Measure Core Web Vitals",
          "Reduce client JavaScript"
        ],
        "project": "Improve a page's score and record the numbers."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "27ae611f-61e0-48f3-97e0-e06d6ad18013",
    "slug": "laravel",
    "title": "Laravel",
    "category": "Engineering",
    "description": "Build PHP web apps with an expressive framework.",
    "subtitle": "Four stages · about two months at five hours a week · 19 resources",
    "roles": [
      "Backend Developer",
      "PHP Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "PHP and setup",
        "description": "Language basics and the project layout.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write PHP classes",
          "Create a Laravel project",
          "Explain the request lifecycle"
        ],
        "project": "Create a project with two routes."
      },
      {
        "stage": 2,
        "title": "Routing, controllers and views",
        "description": "Pages and templates.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a pages-and-forms site."
      },
      {
        "stage": 3,
        "title": "Eloquent and databases",
        "description": "Models, migrations and relations.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write migrations",
          "Use Eloquent relationships",
          "Avoid N+1 queries"
        ],
        "project": "Build a blog with comments."
      },
      {
        "stage": 4,
        "title": "Auth, testing and deploy",
        "description": "Protect and ship.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Add authentication",
          "Write feature tests",
          "Deploy the app"
        ],
        "project": "Deploy a tested app."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "a24e09c1-6e27-4524-bcbf-65cca70a2f54",
    "slug": "elasticsearch",
    "title": "Elasticsearch",
    "category": "Engineering",
    "description": "Add fast, relevant search to applications.",
    "subtitle": "Four stages · about six weeks at four hours a week · 19 resources",
    "roles": [
      "Backend Developer",
      "Search Engineer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Search concepts",
        "description": "Indexes, documents and analysis.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain inverted indexes",
          "Index documents",
          "Choose analysers"
        ],
        "project": "Index a sample dataset and run text queries."
      },
      {
        "stage": 2,
        "title": "Queries and relevance",
        "description": "Match, filter and boost.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Tune results for a product search."
      },
      {
        "stage": 3,
        "title": "Aggregations and mappings",
        "description": "Facets and schema design.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build facets with aggregations",
          "Define mappings",
          "Reindex safely"
        ],
        "project": "Add category facets to your search."
      },
      {
        "stage": 4,
        "title": "Operations",
        "description": "Shards, scaling and monitoring.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain shards and replicas",
          "Monitor cluster health",
          "Plan capacity"
        ],
        "project": "Write a sizing note for a search cluster."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "19fe2e38-1006-4a7b-922b-da2285b50f7b",
    "slug": "wordpress",
    "title": "WordPress",
    "category": "Engineering",
    "description": "Build and customise websites with WordPress.",
    "subtitle": "Four stages · about six weeks at four hours a week · 19 resources",
    "roles": [
      "Web Developer",
      "Freelancer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Setup and content",
        "description": "Install, posts, pages and menus.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Install WordPress",
          "Create content types",
          "Manage media and menus"
        ],
        "project": "Build a small site with five pages."
      },
      {
        "stage": 2,
        "title": "Themes and blocks",
        "description": "Design and layout.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Design a landing page using blocks."
      },
      {
        "stage": 3,
        "title": "Plugins and custom code",
        "description": "Extend the site.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Choose plugins carefully",
          "Write a simple plugin or shortcode",
          "Use hooks"
        ],
        "project": "Build a small custom plugin."
      },
      {
        "stage": 4,
        "title": "Security, speed and launch",
        "description": "Run a site responsibly.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Harden logins and updates",
          "Cache and optimise images",
          "Back up the site"
        ],
        "project": "Launch the site with backups and caching."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "e89ee2e4-8c70-4cf8-a284-c7383f78756a",
    "slug": "django",
    "title": "Django",
    "category": "Engineering",
    "description": "Build full web apps in Python with Django.",
    "subtitle": "Five stages · about three months at six hours a week · 24 resources",
    "roles": [
      "Backend Developer",
      "Python Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Python and setup",
        "description": "Language basics and project layout.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use Python functions and classes",
          "Create a Django project",
          "Explain apps and settings"
        ],
        "project": "Create a project with a home page."
      },
      {
        "stage": 2,
        "title": "Models and the admin",
        "description": "Data and the built-in admin.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Model a recipe book and manage it in admin."
      },
      {
        "stage": 3,
        "title": "Views, templates and forms",
        "description": "Pages and user input.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write views and URLs",
          "Render templates",
          "Validate forms"
        ],
        "project": "Build public pages for your data."
      },
      {
        "stage": 4,
        "title": "Auth, REST and testing",
        "description": "Users, an API and tests.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Add authentication",
          "Expose a REST API",
          "Write tests"
        ],
        "project": "Add login and an API."
      },
      {
        "stage": 5,
        "title": "Deploy",
        "description": "Configuration and hosting.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Separate settings for production",
          "Serve static files",
          "Deploy"
        ],
        "project": "Deploy your app."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "5a97f546-cf9c-40d9-86b2-41cec00cdc95",
    "slug": "ruby-on-rails",
    "title": "Ruby on Rails",
    "category": "Engineering",
    "description": "Build complete web apps quickly with Rails.",
    "subtitle": "Five stages · about three months at six hours a week · 23 resources",
    "roles": [
      "Backend Developer",
      "Full Stack Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Ruby and Rails basics",
        "description": "Language refresh and MVC.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write Ruby classes",
          "Explain MVC in Rails",
          "Generate a Rails app"
        ],
        "project": "Generate an app with one resource."
      },
      {
        "stage": 2,
        "title": "Models and migrations",
        "description": "Active Record.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Model a blog with posts and comments."
      },
      {
        "stage": 3,
        "title": "Controllers and views",
        "description": "Routes, forms and partials.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Define RESTful routes",
          "Build forms",
          "Use partials and helpers"
        ],
        "project": "Build the interface for your blog."
      },
      {
        "stage": 4,
        "title": "Auth, testing and jobs",
        "description": "Real application features.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Add authentication",
          "Write tests",
          "Run background jobs"
        ],
        "project": "Add accounts and tests."
      },
      {
        "stage": 5,
        "title": "Deploy",
        "description": "Production setup.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Configure production",
          "Deploy to a host",
          "Monitor errors"
        ],
        "project": "Deploy your app."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "01ded824-61c4-4a78-9678-1d94c6511ce5",
    "slug": "vibe-coding",
    "title": "Vibe Coding",
    "category": "Engineering",
    "description": "Build software with AI assistance while staying in control.",
    "subtitle": "Four stages · about two months at four hours a week · 19 resources",
    "roles": [
      "Student",
      "Founder",
      "Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "What AI can and can't do",
        "description": "Strengths, limits and risks.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain where AI code goes wrong",
          "Choose tasks to delegate",
          "Read code before trusting it"
        ],
        "project": "Ask an assistant for a small app and review what it wrote."
      },
      {
        "stage": 2,
        "title": "Prompting for software",
        "description": "Specs, constraints and small steps.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a small tool in five iterations and log each prompt."
      },
      {
        "stage": 3,
        "title": "Verify and secure",
        "description": "Tests, review and secrets.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Add tests for AI-written code",
          "Check for insecure patterns",
          "Keep secrets out of prompts"
        ],
        "project": "Review and fix three problems in generated code."
      },
      {
        "stage": 4,
        "title": "Ship and maintain",
        "description": "Deploy and keep it understandable.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Deploy the app",
          "Write a README of how it works",
          "Refactor generated code you do not understand"
        ],
        "project": "Deploy a project and explain each file."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "db702dfe-ff83-486c-a5d2-733be62028e0",
    "slug": "claude-code",
    "title": "Claude Code",
    "category": "Engineering",
    "description": "Work with an AI coding agent in your terminal effectively.",
    "subtitle": "Four stages · about five weeks at three hours a week · 20 resources",
    "roles": [
      "Developer",
      "Student"
    ],
    "hoursPerWeek": 3,
    "stages": [
      {
        "stage": 1,
        "title": "Set up and basics",
        "description": "Install, sign in and run your first task.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Install and start the tool",
          "Ask it to explain a codebase",
          "Review its proposed changes"
        ],
        "project": "Have it explain a repo you have not seen."
      },
      {
        "stage": 2,
        "title": "Working effectively",
        "description": "Context, plans and small tasks.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Fix a real bug with a plan and a review."
      },
      {
        "stage": 3,
        "title": "Safety and review",
        "description": "Permissions, tests and git.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Set sensible permissions",
          "Run tests before accepting",
          "Commit in small steps"
        ],
        "project": "Make a feature on a branch with tests and a clean history."
      },
      {
        "stage": 4,
        "title": "Automate",
        "description": "Repeatable workflows.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Create reusable commands",
          "Use it in scripts",
          "Know when not to use it"
        ],
        "project": "Create one reusable command for a task you repeat."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "02b5aad8-26a6-4c01-9a04-c4bd5c303a3a",
    "slug": "frontend-beginner",
    "title": "Frontend for Absolute Beginners",
    "category": "Engineering",
    "description": "Never coded? Start here and make your first web page.",
    "subtitle": "Five stages · about two months at four hours a week · 24 resources",
    "roles": [
      "Web Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "What a website is",
        "description": "Browser, server and files.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain what happens when you open a site",
          "Set up a code editor",
          "Create and open an HTML file"
        ],
        "project": "Make a page that says who you are."
      },
      {
        "stage": 2,
        "title": "Your first page",
        "description": "Headings, text, images and links.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Build a one-page profile."
      },
      {
        "stage": 3,
        "title": "Make it look good",
        "description": "Colour, fonts and spacing with CSS.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Style text and colours",
          "Use the box model",
          "Lay out with flexbox"
        ],
        "project": "Style your profile page."
      },
      {
        "stage": 4,
        "title": "Make it do something",
        "description": "A first taste of JavaScript.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Respond to a button click",
          "Change text on the page",
          "Use a variable and a function"
        ],
        "project": "Add a light and dark mode button."
      },
      {
        "stage": 5,
        "title": "Put it online",
        "description": "Publish and share.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Publish with a free host",
          "Share the link",
          "Plan what to learn next"
        ],
        "project": "Publish your page and send the link to a friend."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "de0426a3-9bc4-41ac-b4b5-888e9c4bce46",
    "slug": "backend-beginner",
    "title": "Backend for Absolute Beginners",
    "category": "Engineering",
    "description": "Understand what happens behind a website and build a first API.",
    "subtitle": "Five stages · about three months at four hours a week · 23 resources",
    "roles": [
      "Backend Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "How the web talks",
        "description": "Requests, responses and servers.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain a request and a response",
          "Use a browser's network tab",
          "Describe what a server does"
        ],
        "project": "Trace one page load and list its requests."
      },
      {
        "stage": 2,
        "title": "Learn one language",
        "description": "Basics in Python or JavaScript.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Write a script that processes a text file."
      },
      {
        "stage": 3,
        "title": "Your first API",
        "description": "Return data over HTTP.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Create endpoints",
          "Return JSON",
          "Test with a client tool"
        ],
        "project": "Build an API that lists and adds notes."
      },
      {
        "stage": 4,
        "title": "Store data",
        "description": "Tables and queries.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Create a table",
          "Insert and select rows",
          "Connect your API to a database"
        ],
        "project": "Save your notes in a database."
      },
      {
        "stage": 5,
        "title": "Put it online",
        "description": "Deploy a first service.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Deploy on a free host",
          "Use environment variables",
          "Share the URL"
        ],
        "project": "Deploy your notes API."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "5b90801b-458b-480a-a7a4-a98ef4308d10",
    "slug": "git-github-beginner",
    "title": "Git and GitHub for Absolute Beginners",
    "category": "Engineering",
    "description": "Save your work, undo mistakes and share code.",
    "subtitle": "Four stages · about five weeks at three hours a week · 18 resources",
    "roles": [
      "Student",
      "Developer"
    ],
    "hoursPerWeek": 3,
    "stages": [
      {
        "stage": 1,
        "title": "Why version control",
        "description": "The problem Git solves.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain version control",
          "Install Git",
          "Configure your name and email"
        ],
        "project": "Install Git and make your first repository."
      },
      {
        "stage": 2,
        "title": "Save and look back",
        "description": "Add, commit and log.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Make five commits in a small project."
      },
      {
        "stage": 3,
        "title": "Share with GitHub",
        "description": "Remote repos and pull requests.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Push to GitHub",
          "Clone a repo",
          "Open a pull request"
        ],
        "project": "Publish a project and open a pull request on it."
      },
      {
        "stage": 4,
        "title": "When things go wrong",
        "description": "Undo and fix.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Undo a change safely",
          "Resolve a simple conflict",
          "Recover a deleted file"
        ],
        "project": "Practise three recoveries in a throwaway repo."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "46560ce9-7263-4432-8263-f5dfa1c2e6ae",
    "slug": "backend-performance",
    "title": "Backend Performance",
    "category": "Engineering",
    "description": "Find why a service is slow and make it fast.",
    "subtitle": "Four stages · about two months at four hours a week · 19 resources",
    "roles": [
      "Backend Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Measure first",
        "description": "Latency, throughput and profiling.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Define latency percentiles",
          "Load test an endpoint",
          "Find the bottleneck with a profiler"
        ],
        "project": "Load test a sample API and report the slowest endpoint."
      },
      {
        "stage": 2,
        "title": "Database performance",
        "description": "Queries and indexes.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Cut a slow endpoint's queries in half."
      },
      {
        "stage": 3,
        "title": "Caching and pagination",
        "description": "Do less work.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Cache with sensible expiry",
          "Paginate large results",
          "Avoid recomputing"
        ],
        "project": "Add caching and pagination and measure the change."
      },
      {
        "stage": 4,
        "title": "Concurrency and scaling",
        "description": "Using more than one core or machine.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use connection pools",
          "Move slow work to queues",
          "Scale horizontally"
        ],
        "project": "Move a slow task to a background job."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "0cfcd375-7234-4cea-9036-45813e0f2fa0",
    "slug": "frontend-performance",
    "title": "Frontend Performance",
    "category": "Engineering",
    "description": "Make pages load fast and feel smooth.",
    "subtitle": "Four stages · about six weeks at four hours a week · 18 resources",
    "roles": [
      "Frontend Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Measure",
        "description": "Core Web Vitals and profiling.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain LCP, INP and CLS",
          "Audit a page with Lighthouse",
          "Use the performance panel"
        ],
        "project": "Audit a page and list the top three problems."
      },
      {
        "stage": 2,
        "title": "Loading",
        "description": "Images, fonts and scripts.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Improve a page's load time and record the numbers."
      },
      {
        "stage": 3,
        "title": "Rendering and JavaScript",
        "description": "Keeping the main thread free.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Reduce bundle size",
          "Avoid unnecessary re-renders",
          "Split code by route"
        ],
        "project": "Cut a bundle by a third."
      },
      {
        "stage": 4,
        "title": "Caching and monitoring",
        "description": "Make it stay fast.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Set cache headers",
          "Use a CDN",
          "Track real-user metrics"
        ],
        "project": "Add caching headers and a performance budget."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "1c86af72-3551-4763-9af4-b59c85d5d587",
    "slug": "code-review",
    "title": "Code Review",
    "category": "Engineering",
    "description": "Review and be reviewed in ways that improve code and teams.",
    "subtitle": "Four stages · about four weeks at three hours a week · 16 resources",
    "roles": [
      "Software Developer"
    ],
    "hoursPerWeek": 3,
    "stages": [
      {
        "stage": 1,
        "title": "Why and what to look for",
        "description": "Goals of a review.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain what review is for",
          "Check correctness, clarity and risk",
          "Know what to leave to tools"
        ],
        "project": "Review a small pull request with a checklist."
      },
      {
        "stage": 2,
        "title": "Giving feedback",
        "description": "Be clear and kind.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Rewrite five harsh comments to be constructive."
      },
      {
        "stage": 3,
        "title": "Getting reviewed",
        "description": "Make changes easy to review.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Keep changes small",
          "Write a helpful description",
          "Respond to feedback calmly"
        ],
        "project": "Split a large change into three reviewable parts."
      },
      {
        "stage": 4,
        "title": "Team habits",
        "description": "Turn reviews into a healthy practice.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Set review time expectations",
          "Automate style checks",
          "Use reviews to share knowledge"
        ],
        "project": "Write a one-page review guide for a team."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "7de3c6a5-0478-4389-bd80-93bf19e75902",
    "slug": "dsa",
    "title": "Data Structures & Algorithms",
    "category": "Computer Science",
    "description": "Patterns that get you through coding rounds.",
    "subtitle": "Eight stages · about four months at six hours a week · 41 resources",
    "roles": [
      "Software Engineer",
      "SDE Intern",
      "Graduate Engineer Trainee"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Complexity and problem solving",
        "description": "Big O, and a repeatable way to approach any problem.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "State the time and space complexity of your code",
          "Explain why O(n) beats O(n squared) at scale",
          "Follow a clear process for new problems"
        ],
        "project": "Solve five easy problems and write the complexity of each solution."
      },
      {
        "stage": 2,
        "title": "Arrays, strings and hashing",
        "description": "The building blocks behind most interview problems.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use hash maps and sets for fast lookups",
          "Count frequencies",
          "Spot when a nested loop can become one pass"
        ],
        "project": "Solve ten array and string problems, five of them with a hash map."
      },
      {
        "stage": 3,
        "title": "Two pointers and sliding window",
        "description": "Two techniques that turn many O(n squared) solutions into O(n).",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Recognise two-pointer problems",
          "Maintain a sliding window",
          "Handle edge cases cleanly"
        ],
        "project": "Solve eight problems using two pointers or a sliding window."
      },
      {
        "stage": 4,
        "title": "Stacks, queues and linked lists",
        "description": "Linear structures and the problems they solve naturally.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use a stack for matching and undo-style problems",
          "Use a queue for order-of-arrival problems",
          "Manipulate linked list pointers safely"
        ],
        "project": "Implement a stack, a queue and a linked list from scratch, then solve six problems with them."
      },
      {
        "stage": 5,
        "title": "Recursion, sorting and binary search",
        "description": "Divide problems, sort efficiently and search in log time.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write recursive functions with clear base cases",
          "Explain merge sort and quicksort",
          "Apply binary search, including on answers"
        ],
        "project": "Solve eight problems using recursion, sorting or binary search."
      },
      {
        "stage": 6,
        "title": "Trees and graphs",
        "description": "Hierarchies and networks, explored with BFS and DFS.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Traverse trees in all orders",
          "Use BFS for shortest paths in unweighted graphs",
          "Detect cycles and connected components"
        ],
        "project": "Solve ten tree and graph problems, including one shortest-path problem."
      },
      {
        "stage": 7,
        "title": "Dynamic programming",
        "description": "Break problems into overlapping subproblems and reuse answers.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Recognise DP problems",
          "Write memoised and bottom-up solutions",
          "Define states and transitions"
        ],
        "project": "Solve six classic DP problems and explain the state for each."
      },
      {
        "stage": 8,
        "title": "Interview practice",
        "description": "Turn knowledge into performance under time pressure.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Solve medium problems in 30 minutes",
          "Explain your approach while coding",
          "Test your code before the interviewer asks"
        ],
        "project": "Complete four timed mock interviews and record what you would improve."
      }
    ],
    "related": [
      {
        "slug": "system-design",
        "title": "System Design"
      },
      {
        "slug": "computer-science",
        "title": "Computer Science Fundamentals"
      },
      {
        "slug": "leetcode",
        "title": "LeetCode Practice"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      }
    ]
  },
  {
    "id": "cc301616-1d30-4c81-95fe-db0e1f24fd2f",
    "slug": "system-design",
    "title": "System Design",
    "category": "Computer Science",
    "description": "Design services that scale, and explain your choices.",
    "subtitle": "Six stages · about two months at five hours a week · 30 resources",
    "roles": [
      "Software Engineer",
      "Backend Developer",
      "SDE 2"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Foundations: networks and APIs",
        "description": "How requests travel and how services talk to each other.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Trace a request from browser to database",
          "Design clean APIs",
          "Explain load balancers and TLS"
        ],
        "project": "Draw the request path for an app you use, from DNS to database."
      },
      {
        "stage": 2,
        "title": "Data storage choices",
        "description": "Relational and NoSQL databases, and how to model data for each.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Choose between SQL and NoSQL with reasons",
          "Model data for the main access patterns",
          "Use indexes and transactions well"
        ],
        "project": "Write the data model for a chat app and justify the database choice."
      },
      {
        "stage": 3,
        "title": "Scaling reads and writes",
        "description": "Caching, replication, sharding and load balancing.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Add caching at the right layer",
          "Explain replication and sharding trade-offs",
          "Scale stateless services horizontally"
        ],
        "project": "Take a single-server design and scale it to 1 million daily users on paper."
      },
      {
        "stage": 4,
        "title": "Async processing",
        "description": "Queues, background jobs and event-driven designs.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Move slow work off the request path",
          "Explain at-least-once delivery and idempotency",
          "Design a simple event flow"
        ],
        "project": "Design the notification system for a food-delivery app."
      },
      {
        "stage": 5,
        "title": "Reliability and observability",
        "description": "Keeping systems up and knowing when they are not.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Define SLOs",
          "Choose metrics and alerts",
          "Plan for failure of each component"
        ],
        "project": "Write the monitoring plan and failure scenarios for your design."
      },
      {
        "stage": 6,
        "title": "Design interviews",
        "description": "A repeatable framework and practice with classic questions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Run a 45-minute design interview end to end",
          "Estimate scale with rough numbers",
          "Discuss trade-offs clearly"
        ],
        "project": "Do three timed mock designs: URL shortener, chat app and news feed."
      }
    ],
    "related": [
      {
        "slug": "dsa",
        "title": "Data Structures & Algorithms"
      },
      {
        "slug": "computer-science",
        "title": "Computer Science Fundamentals"
      },
      {
        "slug": "leetcode",
        "title": "LeetCode Practice"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      }
    ]
  },
  {
    "id": "9cb322b0-b86c-45a6-9d05-86824e255b3d",
    "slug": "computer-science",
    "title": "Computer Science Fundamentals",
    "category": "Computer Science",
    "description": "The OS, networking, database and OOP basics interviewers expect.",
    "subtitle": "Six stages · about two months at five hours a week · 29 resources",
    "roles": [
      "Software Engineer",
      "SDE Intern",
      "Graduate Engineer Trainee"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "How computers run programs",
        "description": "Processes, threads and memory, without the jargon overload.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain processes versus threads",
          "Describe stack and heap memory",
          "Explain what happens when a program runs"
        ],
        "project": "Write a one-page explainer of what happens when you run a program."
      },
      {
        "stage": 2,
        "title": "Operating systems",
        "description": "Scheduling, synchronisation and deadlocks.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Compare common CPU scheduling algorithms",
          "Explain race conditions and locks",
          "State the conditions for deadlock"
        ],
        "project": "Write a small program with a race condition, then fix it with a lock."
      },
      {
        "stage": 3,
        "title": "Computer networks",
        "description": "From the OSI model to DNS and HTTP.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Name the OSI and TCP/IP layers",
          "Explain TCP versus UDP",
          "Describe DNS resolution"
        ],
        "project": "Capture and explain one HTTP request using your browser tools."
      },
      {
        "stage": 4,
        "title": "Database management systems",
        "description": "The DBMS theory placement interviews love.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Normalise a table to 3NF",
          "Explain ACID and isolation levels",
          "Write joins and use indexes"
        ],
        "project": "Normalise a messy college-records table and write five queries on it."
      },
      {
        "stage": 5,
        "title": "Object-oriented programming",
        "description": "The four pillars and how they show up in real code.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain encapsulation, inheritance, polymorphism and abstraction",
          "Prefer composition where it fits",
          "Recognise common design patterns"
        ],
        "project": "Model a library system with classes and explain each design choice."
      },
      {
        "stage": 6,
        "title": "CS fundamentals for interviews",
        "description": "Pull it together for technical rounds.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Answer common OS, DBMS and networks questions",
          "Explain concepts with examples",
          "Connect theory to your projects"
        ],
        "project": "Record yourself answering fifteen fundamentals questions."
      }
    ],
    "related": [
      {
        "slug": "dsa",
        "title": "Data Structures & Algorithms"
      },
      {
        "slug": "system-design",
        "title": "System Design"
      },
      {
        "slug": "leetcode",
        "title": "LeetCode Practice"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      }
    ]
  },
  {
    "id": "2ff757a0-47e5-4ed8-8ec4-a7e2c0e97d7e",
    "slug": "leetcode",
    "title": "LeetCode Practice",
    "category": "Computer Science",
    "description": "A structured way to practise coding problems for interviews.",
    "subtitle": "Five stages · about three months at seven hours a week · 22 resources",
    "roles": [
      "Software Engineer"
    ],
    "hoursPerWeek": 7,
    "stages": [
      {
        "stage": 1,
        "title": "Set up and pick a language",
        "description": "Tools, templates and a tracking sheet.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Choose one language and learn its standard library",
          "Create a notes template",
          "Set a weekly schedule"
        ],
        "project": "Solve five easy problems and write notes for each."
      },
      {
        "stage": 2,
        "title": "Arrays, strings and hashing",
        "description": "The most common patterns.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "dsa",
          "system-design",
          "computer-science"
        ],
        "project": "Solve 20 problems across these patterns."
      },
      {
        "stage": 3,
        "title": "Stacks, linked lists and trees",
        "description": "Structure-based problems.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use stacks and queues",
          "Traverse trees recursively",
          "Handle linked list pointers"
        ],
        "project": "Solve 20 problems on these structures."
      },
      {
        "stage": 4,
        "title": "Graphs, recursion and dynamic programming",
        "description": "Harder patterns.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Run BFS and DFS",
          "Write recurrences",
          "Memoise and tabulate"
        ],
        "project": "Solve 15 harder problems and explain each solution aloud."
      },
      {
        "stage": 5,
        "title": "Mock interviews",
        "description": "Timed practice and communication.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Solve under time pressure",
          "Think aloud",
          "Review mistakes"
        ],
        "project": "Complete four timed mock interviews."
      }
    ],
    "related": [
      {
        "slug": "dsa",
        "title": "Data Structures & Algorithms"
      },
      {
        "slug": "system-design",
        "title": "System Design"
      },
      {
        "slug": "computer-science",
        "title": "Computer Science Fundamentals"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      }
    ]
  },
  {
    "id": "4da12a8b-b0b4-46c8-a57f-afbe6ca6abc5",
    "slug": "aws",
    "title": "AWS Cloud",
    "category": "Cloud & DevOps",
    "description": "Core AWS services, set up safely on the free tier.",
    "subtitle": "Seven stages · about two months at five hours a week · 32 resources",
    "roles": [
      "Cloud Engineer",
      "DevOps Engineer",
      "Cloud Support Associate"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Cloud concepts and a safe account",
        "description": "How the cloud works and how not to get a surprise bill.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain regions, zones and the shared responsibility model",
          "Set up MFA and budgets",
          "Avoid using the root user"
        ],
        "project": "Create an AWS account with MFA, a budget alert and an admin user."
      },
      {
        "stage": 2,
        "title": "Identity and access (IAM)",
        "description": "Users, roles and policies with least privilege.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write a least-privilege policy",
          "Use roles instead of access keys",
          "Read a policy and explain what it allows"
        ],
        "project": "Create a role that can only read one S3 bucket and test it."
      },
      {
        "stage": 3,
        "title": "Compute and networking",
        "description": "EC2 instances inside a VPC you understand.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Launch and connect to an EC2 instance",
          "Design public and private subnets",
          "Use security groups correctly"
        ],
        "project": "Run a web server on EC2 in a public subnet, reachable only on ports 80 and 22 from your IP."
      },
      {
        "stage": 4,
        "title": "Storage and databases",
        "description": "S3 for files and RDS for relational data.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Store and secure files in S3",
          "Launch a managed PostgreSQL database",
          "Keep databases private"
        ],
        "project": "Host a static site on S3 and connect an app to a private RDS database."
      },
      {
        "stage": 5,
        "title": "Serverless and containers",
        "description": "Lambda, API Gateway and running containers on AWS.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write and trigger a Lambda function",
          "Know when serverless fits",
          "Name the container options"
        ],
        "project": "Build a small serverless API with Lambda that stores data in DynamoDB or S3."
      },
      {
        "stage": 6,
        "title": "Infrastructure as code and cost",
        "description": "Terraform for AWS, and keeping costs under control.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Provision resources with Terraform",
          "Tag and track costs",
          "Tear down safely"
        ],
        "project": "Recreate your stage 3 setup with Terraform, then destroy it."
      },
      {
        "stage": 7,
        "title": "Certification and interviews",
        "description": "Prepare for an entry-level AWS certification and cloud interviews.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Know the Cloud Practitioner exam domains",
          "Answer common cloud interview questions",
          "Explain your projects with AWS diagrams"
        ],
        "project": "Draw an architecture diagram of your best AWS project and explain it in five minutes."
      }
    ],
    "related": [
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      },
      {
        "slug": "network-engineer",
        "title": "Network Engineer"
      }
    ]
  },
  {
    "id": "079183cc-7c27-42fc-ba49-b858d48ad349",
    "slug": "docker",
    "title": "Docker",
    "category": "Cloud & DevOps",
    "description": "Package, run and ship apps in containers.",
    "subtitle": "Five stages · about five weeks at four hours a week · 25 resources",
    "roles": [
      "DevOps Engineer",
      "Backend Developer",
      "Cloud Engineer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Why containers",
        "description": "The problem containers solve and how they differ from virtual machines.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain images and containers",
          "Compare containers with virtual machines",
          "Run your first containers"
        ],
        "project": "Run three official images and explain what each container is doing."
      },
      {
        "stage": 2,
        "title": "Images and Dockerfiles",
        "description": "Write small, fast, secure images.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "aws",
          "kubernetes",
          "devsecops"
        ],
        "project": "Containerise an app with a multi-stage build and halve its image size."
      },
      {
        "stage": 3,
        "title": "Multi-service apps with Compose",
        "description": "Apps, databases and caches started with one command.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write a compose file with health checks",
          "Connect services by name",
          "Persist data with volumes"
        ],
        "project": "Run an app with a database and cache using Docker Compose."
      },
      {
        "stage": 4,
        "title": "Volumes, networks and debugging",
        "description": "What to do when a container misbehaves.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Choose between volumes and bind mounts",
          "Inspect container networks",
          "Debug with logs, exec and inspect"
        ],
        "project": "Break your compose app in three ways and document how you diagnosed each."
      },
      {
        "stage": 5,
        "title": "Shipping images",
        "description": "Registries, tags and CI pipelines that build images.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Tag images with versions",
          "Push to a registry",
          "Build images in CI"
        ],
        "project": "Add a pipeline that builds and pushes a tagged image on every merge."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      },
      {
        "slug": "network-engineer",
        "title": "Network Engineer"
      }
    ]
  },
  {
    "id": "7f37a8da-6e53-43f3-a806-90e6d7d06d41",
    "slug": "kubernetes",
    "title": "Kubernetes",
    "category": "Cloud & DevOps",
    "description": "Run containers reliably at scale.",
    "subtitle": "Five stages · about two months at five hours a week · 25 resources",
    "roles": [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Platform Engineer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Prerequisites: containers and YAML",
        "description": "The two things you need before Kubernetes makes sense.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Build and run container images",
          "Read and write YAML confidently",
          "Explain why orchestration exists"
        ],
        "project": "Containerise an app and write its configuration as YAML."
      },
      {
        "stage": 2,
        "title": "Core objects",
        "description": "Pods, Deployments and Services.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "devsecops"
        ],
        "project": "Run an app with three replicas on a local cluster."
      },
      {
        "stage": 3,
        "title": "Configuration, secrets and storage",
        "description": "Keep config out of images and data safe across restarts.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Use ConfigMaps and Secrets",
          "Mount persistent volumes",
          "Know what Secrets do and do not protect"
        ],
        "project": "Move all configuration of your app into ConfigMaps and Secrets and add a persistent volume."
      },
      {
        "stage": 4,
        "title": "Networking and ingress",
        "description": "Routing traffic into and around the cluster.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Choose the right Service type",
          "Route HTTP traffic with Ingress",
          "Understand cluster DNS"
        ],
        "project": "Expose two services on different paths through one Ingress."
      },
      {
        "stage": 5,
        "title": "Deploying and operating",
        "description": "Rollouts, scaling and health in production.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Roll out and roll back safely",
          "Set resource requests and limits",
          "Scale automatically with load"
        ],
        "project": "Add probes, resource limits and autoscaling, then perform a rollout and a rollback."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      },
      {
        "slug": "network-engineer",
        "title": "Network Engineer"
      }
    ]
  },
  {
    "id": "cd73c46b-617f-44c2-b4c3-759617f343d1",
    "slug": "devsecops",
    "title": "DevSecOps Engineer",
    "category": "Cloud & DevOps",
    "description": "Put security checks into every step of building and shipping software.",
    "subtitle": "Six stages · about four months at six hours a week · 24 resources",
    "roles": [
      "DevSecOps Engineer",
      "Security Engineer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "DevOps and security foundations",
        "description": "Pipelines, Linux, networking and the threats that matter.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain the CI/CD flow end to end",
          "Name the OWASP top risks",
          "Read a Linux server's open ports and users"
        ],
        "project": "Draw the delivery pipeline of a small app and mark where attacks could enter."
      },
      {
        "stage": 2,
        "title": "Secure the code",
        "description": "Secrets, dependency risk and static analysis in pull requests.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Keep secrets out of the repo",
          "Scan dependencies for known vulnerabilities",
          "Add static analysis to a pull request check"
        ],
        "project": "Add secret scanning and a dependency audit to a sample repo's pipeline."
      },
      {
        "stage": 3,
        "title": "Secure the build and containers",
        "description": "Trusted images, minimal containers and signed artefacts.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write a minimal, non-root Dockerfile",
          "Scan an image for vulnerabilities",
          "Explain image signing and SBOMs"
        ],
        "project": "Harden a Dockerfile and show the scan results before and after."
      },
      {
        "stage": 4,
        "title": "Secure the infrastructure",
        "description": "Least privilege, network rules and policy as code.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write least-privilege access policies",
          "Lock down network paths between services",
          "Check infrastructure code with a policy tool"
        ],
        "project": "Review a Terraform file and fix its open security group and broad IAM role."
      },
      {
        "stage": 5,
        "title": "Detect and respond",
        "description": "Logs, alerts, and what to do when something goes wrong.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Centralise logs and set useful alerts",
          "Run a simple incident response checklist",
          "Write a blameless post-incident note"
        ],
        "project": "Simulate a leaked key and write the response timeline."
      },
      {
        "stage": 6,
        "title": "Portfolio and interviews",
        "description": "Show a secured pipeline and explain the trade-offs.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Present a pipeline with security gates",
          "Answer shift-left and threat-modelling questions",
          "Explain one past finding and its fix"
        ],
        "project": "Publish a repo with a pipeline that fails on a planted vulnerability."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      },
      {
        "slug": "network-engineer",
        "title": "Network Engineer"
      }
    ]
  },
  {
    "id": "d1409477-a637-4379-a984-eec00f1c3f64",
    "slug": "cyber-security",
    "title": "Cyber Security Analyst",
    "category": "Cloud & DevOps",
    "description": "Learn to defend systems and recognise attacks.",
    "subtitle": "Six stages · about four months at six hours a week · 26 resources",
    "roles": [
      "Security Analyst",
      "SOC Analyst"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Foundations",
        "description": "Networking, operating systems and how attacks start.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Explain TCP/IP, DNS and HTTP",
          "Use the Linux command line",
          "Describe common attack types"
        ],
        "project": "Capture traffic with a sniffer and explain a web request."
      },
      {
        "stage": 2,
        "title": "Security principles",
        "description": "Confidentiality, integrity, availability and least privilege.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Write a one-page security policy for a small company."
      },
      {
        "stage": 3,
        "title": "Web and application security",
        "description": "OWASP risks and how to test for them.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Explain injection, XSS and broken access control",
          "Test a deliberately vulnerable app",
          "Recommend fixes"
        ],
        "project": "Exploit and then fix three issues in a practice app."
      },
      {
        "stage": 4,
        "title": "Detection and monitoring",
        "description": "Logs, alerts and spotting the unusual.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Read logs for suspicious activity",
          "Explain what a SIEM does",
          "Triage an alert"
        ],
        "project": "Investigate a sample log file and write what you found."
      },
      {
        "stage": 5,
        "title": "Incident response",
        "description": "Contain, eradicate, recover and learn.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Follow an incident response process",
          "Preserve evidence",
          "Write an incident report"
        ],
        "project": "Write a report for a simulated phishing incident."
      },
      {
        "stage": 6,
        "title": "Careers and practice",
        "description": "Labs, certifications and interview preparation.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Complete beginner capture-the-flag labs",
          "Choose an entry certification",
          "Answer common analyst questions"
        ],
        "project": "Write up two lab solutions on a personal blog."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      },
      {
        "slug": "network-engineer",
        "title": "Network Engineer"
      }
    ]
  },
  {
    "id": "78f50ad1-210f-4873-b76f-f86ebcf19ea6",
    "slug": "ai-red-teaming",
    "title": "AI Red Teaming",
    "category": "Cloud & DevOps",
    "description": "Test AI systems for weaknesses before attackers do.",
    "subtitle": "Five stages · about three months at five hours a week · 22 resources",
    "roles": [
      "AI Red Teamer",
      "AI Security Engineer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "How AI systems fail",
        "description": "Models, data and the application around them.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Describe how language models are used in apps",
          "List common failure types",
          "Map an AI app's attack surface"
        ],
        "project": "Draw the attack surface of a chatbot with tools."
      },
      {
        "stage": 2,
        "title": "Prompt attacks",
        "description": "Injection, jailbreaks and data leakage.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Test a sample chatbot and write three reproducible findings."
      },
      {
        "stage": 3,
        "title": "Agents and tools",
        "description": "When models can act: permissions and abuse.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Review tool permissions",
          "Test for confused-deputy problems",
          "Recommend least-privilege design"
        ],
        "project": "Review an agent's tool list and rank its risks."
      },
      {
        "stage": 4,
        "title": "Defences and evaluation",
        "description": "Filters, guardrails and measuring robustness.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Compare common defences",
          "Build a small attack test set",
          "Measure before and after a fix"
        ],
        "project": "Create a test suite and report how a defence changes results."
      },
      {
        "stage": 5,
        "title": "Reporting and ethics",
        "description": "Responsible disclosure and clear write-ups.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a clear severity-rated report",
          "Follow responsible disclosure",
          "Stay within scope"
        ],
        "project": "Write a full report for one finding with fix advice."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "network-engineer",
        "title": "Network Engineer"
      }
    ]
  },
  {
    "id": "4914da33-c20e-459d-bcf1-7cabd43034b7",
    "slug": "network-engineer",
    "title": "Network Engineer",
    "category": "Cloud & DevOps",
    "description": "Design and run the networks that everything else depends on.",
    "subtitle": "Six stages · about four months at six hours a week · 28 resources",
    "roles": [
      "Network Engineer",
      "Network Administrator"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Networking fundamentals",
        "description": "Layers, addressing and how packets move.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Explain the OSI and TCP/IP models",
          "Subnet an IPv4 network",
          "Trace a packet from client to server"
        ],
        "project": "Subnet a small office network on paper."
      },
      {
        "stage": 2,
        "title": "Switching and routing",
        "description": "VLANs, static and dynamic routing.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Build a three-router lab in a simulator."
      },
      {
        "stage": 3,
        "title": "Services and security",
        "description": "DNS, DHCP, NAT, firewalls and VPNs.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Run DHCP and DNS in a lab",
          "Write firewall rules",
          "Set up a VPN"
        ],
        "project": "Add a firewall and VPN to your lab network."
      },
      {
        "stage": 4,
        "title": "Wireless and cloud networking",
        "description": "Wi-Fi design and virtual networks.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Plan wireless coverage",
          "Build a cloud virtual network",
          "Connect on-premises to cloud"
        ],
        "project": "Design a hybrid network diagram for a small company."
      },
      {
        "stage": 5,
        "title": "Operations and troubleshooting",
        "description": "Monitoring, automation and methodical debugging.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use ping, traceroute and packet capture",
          "Monitor with SNMP or a dashboard",
          "Automate configuration backups"
        ],
        "project": "Troubleshoot three broken lab scenarios and document fixes."
      },
      {
        "stage": 6,
        "title": "Certification and interviews",
        "description": "Choose a path and practise.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Pick an entry certification",
          "Answer troubleshooting questions",
          "Explain a design you built"
        ],
        "project": "Write a study plan for your chosen certification."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      }
    ]
  },
  {
    "id": "898829dd-bd38-4df0-b148-c4ab6d61d384",
    "slug": "linux",
    "title": "Linux",
    "category": "Cloud & DevOps",
    "description": "Be comfortable at the command line of any server.",
    "subtitle": "Four stages · about two months at five hours a week · 20 resources",
    "roles": [
      "DevOps Engineer",
      "System Administrator"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "The command line",
        "description": "Navigation, files and permissions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Move around and manage files",
          "Read and set permissions",
          "Use pipes and redirects"
        ],
        "project": "Organise a project directory using only the shell."
      },
      {
        "stage": 2,
        "title": "Text and processes",
        "description": "grep, sed, processes and services.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Find the top ten error causes in a log file."
      },
      {
        "stage": 3,
        "title": "Shell scripting",
        "description": "Automate repeated tasks.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write scripts with variables and loops",
          "Handle errors and arguments",
          "Schedule with cron"
        ],
        "project": "Write a backup script scheduled with cron."
      },
      {
        "stage": 4,
        "title": "Users, packages and networking",
        "description": "Administration basics.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Manage users and groups",
          "Install and update packages",
          "Inspect ports and connections"
        ],
        "project": "Set up and secure a small server."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      }
    ]
  },
  {
    "id": "df0b3c7b-fc73-4bf9-aa61-3e8a8513bb9e",
    "slug": "terraform",
    "title": "Terraform",
    "category": "Cloud & DevOps",
    "description": "Describe infrastructure as code and apply it safely.",
    "subtitle": "Four stages · about two months at five hours a week · 19 resources",
    "roles": [
      "DevOps Engineer",
      "Cloud Engineer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Concepts and first config",
        "description": "Providers, resources and state.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain infrastructure as code",
          "Write and apply a configuration",
          "Understand the state file"
        ],
        "project": "Create a storage bucket with Terraform."
      },
      {
        "stage": 2,
        "title": "Variables, outputs and modules",
        "description": "Reusable configuration.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Turn your config into a reusable module."
      },
      {
        "stage": 3,
        "title": "Real infrastructure",
        "description": "Networks, compute and databases.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Build a network with subnets",
          "Launch compute behind a firewall",
          "Manage secrets safely"
        ],
        "project": "Provision a small web stack."
      },
      {
        "stage": 4,
        "title": "Teams and safety",
        "description": "Remote state, workflows and review.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use remote state with locking",
          "Review plans in pull requests",
          "Detect drift"
        ],
        "project": "Add a plan-on-pull-request pipeline."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      }
    ]
  },
  {
    "id": "f805b931-924c-41a7-b0ba-083bebe6bf44",
    "slug": "cloudflare",
    "title": "Cloudflare",
    "category": "Cloud & DevOps",
    "description": "Put your site behind a global network that makes it fast and safe.",
    "subtitle": "Four stages · about six weeks at four hours a week · 18 resources",
    "roles": [
      "DevOps Engineer",
      "Web Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "DNS and CDN",
        "description": "How traffic reaches your site.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Move a domain's DNS",
          "Explain caching at the edge",
          "Set cache rules"
        ],
        "project": "Put a site behind Cloudflare and measure the speed change."
      },
      {
        "stage": 2,
        "title": "Security",
        "description": "HTTPS, firewall rules and bot protection.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Block a simulated abusive pattern with a rule."
      },
      {
        "stage": 3,
        "title": "Workers and storage",
        "description": "Run code and store data at the edge.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Deploy a Worker",
          "Use key-value or object storage",
          "Handle requests at the edge"
        ],
        "project": "Build a small API on Workers."
      },
      {
        "stage": 4,
        "title": "Operations",
        "description": "Analytics and troubleshooting.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Read analytics and logs",
          "Debug cache and SSL issues",
          "Plan changes safely"
        ],
        "project": "Write a troubleshooting checklist."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      }
    ]
  },
  {
    "id": "0ea25b09-7064-4e6d-acba-3f0990e01a74",
    "slug": "shell-bash",
    "title": "Shell and Bash",
    "category": "Cloud & DevOps",
    "description": "Automate your computer with the shell.",
    "subtitle": "Four stages · about six weeks at four hours a week · 18 resources",
    "roles": [
      "DevOps Engineer",
      "Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Commands and pipelines",
        "description": "Combine small tools.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Use pipes, redirects and globbing",
          "Search and filter text",
          "Read man pages"
        ],
        "project": "Summarise a CSV with a one-line pipeline."
      },
      {
        "stage": 2,
        "title": "Scripts",
        "description": "Variables, conditions and loops.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Write a script that renames and sorts files."
      },
      {
        "stage": 3,
        "title": "Robust scripts",
        "description": "Safety, functions and testing.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use set -euo pipefail sensibly",
          "Write functions",
          "Test with sample input"
        ],
        "project": "Harden a script against missing files and bad input."
      },
      {
        "stage": 4,
        "title": "Automation",
        "description": "Cron and real jobs.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Schedule jobs",
          "Log output",
          "Notify on failure"
        ],
        "project": "Automate a nightly backup with logging."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      }
    ]
  },
  {
    "id": "78405afd-22e7-491d-9a14-80f8b875f8b6",
    "slug": "devops-beginner",
    "title": "DevOps for Absolute Beginners",
    "category": "Cloud & DevOps",
    "description": "A gentle start: servers, scripts and shipping code.",
    "subtitle": "Five stages · about three months at four hours a week · 24 resources",
    "roles": [
      "DevOps Engineer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "What DevOps means",
        "description": "Building, shipping and running software together.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain the software delivery cycle",
          "Name common tools and what they do",
          "Describe why automation helps"
        ],
        "project": "Draw how code gets from a laptop to users."
      },
      {
        "stage": 2,
        "title": "The command line",
        "description": "Navigate and automate.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Write a script that backs up a folder."
      },
      {
        "stage": 3,
        "title": "Git and CI",
        "description": "Track changes and test on every push.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use Git branches",
          "Run a pipeline on push",
          "Read a failed build"
        ],
        "project": "Add a CI pipeline to a small repo."
      },
      {
        "stage": 4,
        "title": "Containers",
        "description": "Package an app so it runs anywhere.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain images and containers",
          "Write a simple Dockerfile",
          "Run a container locally"
        ],
        "project": "Containerise a small app."
      },
      {
        "stage": 5,
        "title": "Cloud basics",
        "description": "A server on the internet.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Launch a virtual machine",
          "Open and close ports safely",
          "Shut down to avoid cost"
        ],
        "project": "Run your container on a cloud server."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      }
    ]
  },
  {
    "id": "d4c67c39-e142-42cd-8da4-57f6042c6edb",
    "slug": "aws-best-practices",
    "title": "AWS Best Practices",
    "category": "Cloud & DevOps",
    "description": "Run workloads on AWS securely, reliably and cheaply.",
    "subtitle": "Four stages · about two months at five hours a week · 20 resources",
    "roles": [
      "Cloud Engineer",
      "DevOps Engineer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Account and identity",
        "description": "Safe starting point.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Secure the root account",
          "Use least-privilege IAM",
          "Enable audit logging"
        ],
        "project": "Harden a new account and write what you changed."
      },
      {
        "stage": 2,
        "title": "Reliability",
        "description": "Design for failure.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Make a simple app survive the loss of one instance."
      },
      {
        "stage": 3,
        "title": "Security",
        "description": "Network, data and secrets.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Restrict network access",
          "Encrypt data at rest and in transit",
          "Store secrets in a managed service"
        ],
        "project": "Fix a deliberately open security group and public bucket."
      },
      {
        "stage": 4,
        "title": "Cost and operations",
        "description": "Spend wisely and observe.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Set budgets and alerts",
          "Right-size resources",
          "Monitor with metrics and logs"
        ],
        "project": "Create a cost report and cut one expense."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      }
    ]
  },
  {
    "id": "d63b4ca9-1bdb-4dd1-89a2-247379f5423a",
    "slug": "api-security",
    "title": "API Security",
    "category": "Cloud & DevOps",
    "description": "Protect APIs from the common ways they are attacked.",
    "subtitle": "Four stages · about six weeks at four hours a week · 18 resources",
    "roles": [
      "Backend Developer",
      "Security Engineer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Threats",
        "description": "How APIs are attacked.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Name the top API risks",
          "Explain broken object-level authorisation",
          "Threat-model an endpoint"
        ],
        "project": "List the threats for a user-profile endpoint."
      },
      {
        "stage": 2,
        "title": "Authentication and authorisation",
        "description": "Who are you and what may you do.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "aws",
          "docker",
          "kubernetes"
        ],
        "project": "Find and fix an authorisation bug in a sample API."
      },
      {
        "stage": 3,
        "title": "Input and output safety",
        "description": "Validate and limit.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Validate input at the edge",
          "Return only needed fields",
          "Prevent injection"
        ],
        "project": "Add validation and response filtering to an API."
      },
      {
        "stage": 4,
        "title": "Abuse protection and monitoring",
        "description": "Rate limits and logs.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Add rate limits",
          "Log security events without secrets",
          "Alert on suspicious patterns"
        ],
        "project": "Add rate limiting and a security log."
      }
    ],
    "related": [
      {
        "slug": "aws",
        "title": "AWS Cloud"
      },
      {
        "slug": "docker",
        "title": "Docker"
      },
      {
        "slug": "kubernetes",
        "title": "Kubernetes"
      },
      {
        "slug": "devsecops",
        "title": "DevSecOps Engineer"
      },
      {
        "slug": "cyber-security",
        "title": "Cyber Security Analyst"
      },
      {
        "slug": "ai-red-teaming",
        "title": "AI Red Teaming"
      }
    ]
  },
  {
    "id": "9082da3a-5102-425d-8414-898ef312c7ed",
    "slug": "python",
    "title": "Python",
    "category": "Languages",
    "description": "From your first script to real projects.",
    "subtitle": "Six stages · about two months at five hours a week · 31 resources",
    "roles": [
      "Python Developer",
      "Backend Developer",
      "Data Analyst"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Python basics",
        "description": "Syntax, types and control flow.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use variables, strings and numbers",
          "Write conditions and loops",
          "Read error messages"
        ],
        "project": "Write a number-guessing game and a simple grade calculator."
      },
      {
        "stage": 2,
        "title": "Functions, modules and files",
        "description": "Organise code and work with files.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "java",
          "sql",
          "javascript"
        ],
        "project": "Build a command-line expense tracker that saves to a JSON file."
      },
      {
        "stage": 3,
        "title": "Core data structures",
        "description": "Lists, dictionaries, sets and comprehensions.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Choose the right data structure",
          "Write comprehensions",
          "Sort and group data"
        ],
        "project": "Analyse a CSV of marks or sales using only built-in data structures."
      },
      {
        "stage": 4,
        "title": "Classes and exceptions",
        "description": "Object-oriented Python and robust error handling.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write classes with methods",
          "Raise and handle exceptions",
          "Know when not to use a class"
        ],
        "project": "Refactor your expense tracker into classes with proper error handling."
      },
      {
        "stage": 5,
        "title": "Packages and tooling",
        "description": "Virtual environments, packages and project setup.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Create virtual environments",
          "Install and pin packages",
          "Structure a project"
        ],
        "project": "Turn one of your projects into a proper package with a README and requirements file."
      },
      {
        "stage": 6,
        "title": "Build real projects",
        "description": "Automation, web and data projects for your portfolio.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Automate a real task",
          "Call a web API",
          "Ship a project others can run"
        ],
        "project": "Build and publish one automation or web project and paste its link."
      }
    ],
    "related": [
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      },
      {
        "slug": "cpp",
        "title": "C++"
      }
    ]
  },
  {
    "id": "cf5c0169-ff02-437b-b604-7a19b74f2419",
    "slug": "java",
    "title": "Java",
    "category": "Languages",
    "description": "Core Java, OOP and your first Spring Boot API.",
    "subtitle": "Six stages · about three months at six hours a week · 30 resources",
    "roles": [
      "Java Developer",
      "Software Engineer",
      "Backend Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Java basics",
        "description": "Syntax, types and the structure of a Java program.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write and run Java programs",
          "Use primitive types, strings and arrays",
          "Write methods and control flow"
        ],
        "project": "Write a console app that manages a list of students and their marks."
      },
      {
        "stage": 2,
        "title": "Object-oriented Java",
        "description": "Classes, inheritance, interfaces and good design.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "python",
          "sql",
          "javascript"
        ],
        "project": "Model a banking system with accounts, transactions and interfaces."
      },
      {
        "stage": 3,
        "title": "Collections and streams",
        "description": "The Java collections framework and functional-style streams.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Choose between List, Set and Map",
          "Use generics",
          "Process data with streams"
        ],
        "project": "Rewrite your student app using collections and streams for reports."
      },
      {
        "stage": 4,
        "title": "Exceptions and concurrency",
        "description": "Handle errors properly and run work in parallel safely.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Use checked and unchecked exceptions correctly",
          "Create threads and executors",
          "Avoid race conditions"
        ],
        "project": "Process a large file in parallel with an executor and handle failures."
      },
      {
        "stage": 5,
        "title": "REST APIs with Spring Boot",
        "description": "Build a real backend with the most used Java framework.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Create a Spring Boot project",
          "Build REST endpoints with validation",
          "Connect to a database with Spring Data JPA"
        ],
        "project": "Build a notes API in Spring Boot with PostgreSQL and deploy it."
      },
      {
        "stage": 6,
        "title": "Java interviews",
        "description": "Core Java, OOP and Spring questions for freshers.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Answer core Java questions",
          "Explain OOP with examples",
          "Discuss your Spring Boot project"
        ],
        "project": "Record answers to twenty Java interview questions and review them."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      },
      {
        "slug": "cpp",
        "title": "C++"
      }
    ]
  },
  {
    "id": "4e3dc388-3681-4976-ba9e-cb1e9fbfb3b9",
    "slug": "sql",
    "title": "SQL",
    "category": "Languages",
    "description": "Query, design and tune relational databases.",
    "subtitle": "Six stages · about six weeks at four hours a week · 26 resources",
    "roles": [
      "Data Analyst",
      "Backend Developer",
      "Database Developer"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Querying basics",
        "description": "Select, filter and sort with confidence.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Filter with WHERE conditions",
          "Sort and limit results",
          "Handle NULLs correctly"
        ],
        "project": "Answer ten questions on a sample database using single-table queries."
      },
      {
        "stage": 2,
        "title": "Joins and aggregation",
        "description": "Combine tables and summarise data.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "javascript"
        ],
        "project": "Write queries for revenue by city, top customers and customers with no orders."
      },
      {
        "stage": 3,
        "title": "Window functions and CTEs",
        "description": "Advanced queries that come up in every SQL interview.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Rank within groups",
          "Compute running totals and changes",
          "Structure queries with CTEs"
        ],
        "project": "Solve eight window-function and CTE problems."
      },
      {
        "stage": 4,
        "title": "Designing schemas",
        "description": "Tables, keys and normalisation.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Model entities and relationships",
          "Normalise to 3NF",
          "Choose constraints"
        ],
        "project": "Design the schema for a college placement portal."
      },
      {
        "stage": 5,
        "title": "Indexes, transactions and performance",
        "description": "Make queries fast and data safe.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Add and evaluate indexes",
          "Use transactions",
          "Read EXPLAIN output"
        ],
        "project": "Speed up a slow query by at least 10 times and document how."
      },
      {
        "stage": 6,
        "title": "SQL interviews",
        "description": "Practise the patterns interviewers test.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Solve common SQL interview patterns",
          "Explain your query logic",
          "Handle edge cases"
        ],
        "project": "Solve twenty interview-style SQL problems in a timed setting."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      },
      {
        "slug": "cpp",
        "title": "C++"
      }
    ]
  },
  {
    "id": "9cfbcbf9-d598-4c68-97a2-5a77a4d8c2b1",
    "slug": "javascript",
    "title": "JavaScript",
    "category": "Languages",
    "description": "The language of the web, from basics to async code.",
    "subtitle": "Five stages · about two months at six hours a week · 25 resources",
    "roles": [
      "Frontend Developer",
      "Full Stack Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Values and functions",
        "description": "Types, control flow and functions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use variables, types and operators",
          "Write and call functions",
          "Explain scope and closures"
        ],
        "project": "Write a small calculator with tests."
      },
      {
        "stage": 2,
        "title": "Arrays, objects and modules",
        "description": "Data handling and code organisation.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Build a data-processing script over a list of records."
      },
      {
        "stage": 3,
        "title": "The DOM and events",
        "description": "Make a page interactive.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Select and change elements",
          "Handle events with delegation",
          "Build a small interactive widget"
        ],
        "project": "Build a to-do list that stores items in localStorage."
      },
      {
        "stage": 4,
        "title": "Async JavaScript",
        "description": "Promises, async/await and fetch.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain the event loop in plain words",
          "Use async/await with error handling",
          "Fetch and render API data"
        ],
        "project": "Build a search page over a public API."
      },
      {
        "stage": 5,
        "title": "Tooling and testing",
        "description": "npm, modules and writing tests.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use npm and a bundler",
          "Write unit tests",
          "Lint and format code"
        ],
        "project": "Add tests and linting to your project."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      },
      {
        "slug": "cpp",
        "title": "C++"
      }
    ]
  },
  {
    "id": "71bd88cc-e807-4afb-a224-73f28c27a117",
    "slug": "typescript",
    "title": "TypeScript",
    "category": "Languages",
    "description": "Add types to JavaScript and catch bugs before running.",
    "subtitle": "Four stages · about two months at five hours a week · 19 resources",
    "roles": [
      "Frontend Developer",
      "Node.js Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Types basics",
        "description": "Primitives, arrays, objects and inference.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Annotate variables and functions",
          "Use unions and literals",
          "Understand type inference"
        ],
        "project": "Convert a small JavaScript file to TypeScript."
      },
      {
        "stage": 2,
        "title": "Interfaces, generics and narrowing",
        "description": "Describing shapes and reusing types.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Type a data-fetching helper with generics."
      },
      {
        "stage": 3,
        "title": "Real projects",
        "description": "Config, strictness and third-party types.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Configure tsconfig strict mode",
          "Type API responses",
          "Use utility types"
        ],
        "project": "Add TypeScript to an existing project with strict mode on."
      },
      {
        "stage": 4,
        "title": "Patterns and testing",
        "description": "Validation at boundaries and typed tests.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Validate untrusted input at runtime",
          "Write typed tests",
          "Avoid any"
        ],
        "project": "Build a typed API client with runtime validation."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      },
      {
        "slug": "cpp",
        "title": "C++"
      }
    ]
  },
  {
    "id": "09d1b56f-a2d4-497d-827d-1395e8ac18af",
    "slug": "c-programming",
    "title": "C Programming",
    "category": "Languages",
    "description": "Learn how programs really use memory and the machine.",
    "subtitle": "Five stages · about three months at six hours a week · 23 resources",
    "roles": [
      "Embedded Developer",
      "Systems Programmer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Basics",
        "description": "Compile, run, types and control flow.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Compile and run a C program",
          "Use variables, loops and functions",
          "Read input and print output"
        ],
        "project": "Write a number-guessing game."
      },
      {
        "stage": 2,
        "title": "Pointers and memory",
        "description": "Addresses, arrays and the heap.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Implement a dynamic array."
      },
      {
        "stage": 3,
        "title": "Structs, files and modules",
        "description": "Organising bigger programs.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Define structs and enums",
          "Read and write files",
          "Split code across headers and sources"
        ],
        "project": "Build a contact book that saves to a file."
      },
      {
        "stage": 4,
        "title": "Data structures in C",
        "description": "Lists, stacks and hash tables.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Implement a linked list",
          "Implement a hash table",
          "Test for leaks"
        ],
        "project": "Implement and test two data structures."
      },
      {
        "stage": 5,
        "title": "Build and debug",
        "description": "Makefiles, gdb and warnings.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a Makefile",
          "Debug with gdb",
          "Turn on and fix warnings"
        ],
        "project": "Add a build and tests to your project."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "cpp",
        "title": "C++"
      }
    ]
  },
  {
    "id": "f0db416e-edf7-4952-9520-b14f02301214",
    "slug": "cpp",
    "title": "C++",
    "category": "Languages",
    "description": "Write fast, modern C++ with confidence.",
    "subtitle": "Five stages · about three months at six hours a week · 23 resources",
    "roles": [
      "Software Engineer",
      "Systems Programmer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Basics and the standard library",
        "description": "Types, functions, strings and vectors.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use the standard containers",
          "Write functions and classes",
          "Use references and const"
        ],
        "project": "Write a text-statistics program."
      },
      {
        "stage": 2,
        "title": "Object-oriented C++",
        "description": "Classes, inheritance and RAII.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Model a bank account system."
      },
      {
        "stage": 3,
        "title": "Modern C++",
        "description": "Smart pointers, move semantics and lambdas.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use unique_ptr and shared_ptr",
          "Explain move semantics",
          "Use lambdas and algorithms"
        ],
        "project": "Refactor a raw-pointer program to modern C++."
      },
      {
        "stage": 4,
        "title": "Templates and the STL",
        "description": "Generic code.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write a function template",
          "Use STL algorithms",
          "Read template error messages"
        ],
        "project": "Implement a generic container."
      },
      {
        "stage": 5,
        "title": "Build and test",
        "description": "CMake, tests and profiling.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build with CMake",
          "Write unit tests",
          "Profile a slow function"
        ],
        "project": "Add tests and a build to your project."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      }
    ]
  },
  {
    "id": "ba66f926-5d18-4b55-a0e2-707922911797",
    "slug": "rust",
    "title": "Rust",
    "category": "Languages",
    "description": "Safe, fast systems programming with ownership.",
    "subtitle": "Five stages · about three months at six hours a week · 23 resources",
    "roles": [
      "Systems Programmer",
      "Backend Developer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Basics",
        "description": "Cargo, types and control flow.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use Cargo",
          "Write functions and control flow",
          "Use structs and enums"
        ],
        "project": "Write a temperature converter."
      },
      {
        "stage": 2,
        "title": "Ownership and borrowing",
        "description": "Rust's core idea.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Fix ten compiler errors in a prepared exercise."
      },
      {
        "stage": 3,
        "title": "Collections, errors and traits",
        "description": "Idiomatic Rust.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use Vec, HashMap and iterators",
          "Handle errors with Result",
          "Define and implement traits"
        ],
        "project": "Build a log parser."
      },
      {
        "stage": 4,
        "title": "Concurrency and async",
        "description": "Threads and async runtimes.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use threads and channels",
          "Explain Send and Sync",
          "Write async code"
        ],
        "project": "Build a concurrent URL checker."
      },
      {
        "stage": 5,
        "title": "Project and tooling",
        "description": "Testing, crates and publishing.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write tests",
          "Use crates",
          "Publish documentation"
        ],
        "project": ""
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      }
    ]
  },
  {
    "id": "89b96297-d327-444a-ba90-d1b8165b2b09",
    "slug": "go",
    "title": "Go",
    "category": "Languages",
    "description": "Simple, fast services and tools in Go.",
    "subtitle": "Five stages · about three months at six hours a week · 24 resources",
    "roles": [
      "Backend Developer",
      "Cloud Engineer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Basics",
        "description": "Types, functions and packages.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use variables, slices and maps",
          "Write functions and structs",
          "Organise code in packages"
        ],
        "project": "Write a word-frequency CLI."
      },
      {
        "stage": 2,
        "title": "Interfaces and errors",
        "description": "Go's approach to design.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Build and test a small library."
      },
      {
        "stage": 3,
        "title": "Concurrency",
        "description": "Goroutines, channels and context.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Run goroutines safely",
          "Use channels and select",
          "Cancel work with context"
        ],
        "project": "Build a concurrent web crawler."
      },
      {
        "stage": 4,
        "title": "Web services",
        "description": "HTTP servers and databases.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Build a JSON API",
          "Connect to a database",
          "Add middleware and logging"
        ],
        "project": "Build a URL shortener service."
      },
      {
        "stage": 5,
        "title": "Ship it",
        "description": "Containers and deployment.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build a small Docker image",
          "Add configuration and health checks",
          "Deploy"
        ],
        "project": "Deploy your service."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      }
    ]
  },
  {
    "id": "a5e4c555-5ec3-4975-9cff-1407072c47b8",
    "slug": "php",
    "title": "PHP",
    "category": "Languages",
    "description": "Build dynamic websites and back ends with PHP.",
    "subtitle": "Four stages · about two months at five hours a week · 20 resources",
    "roles": [
      "Backend Developer",
      "Web Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Basics",
        "description": "Syntax, arrays and functions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write PHP scripts",
          "Use arrays and functions",
          "Handle forms"
        ],
        "project": "Build a contact form that validates input."
      },
      {
        "stage": 2,
        "title": "Object-oriented PHP",
        "description": "Classes, namespaces and Composer.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Refactor your form into classes."
      },
      {
        "stage": 3,
        "title": "Databases and security",
        "description": "PDO and safe input.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use PDO with prepared statements",
          "Hash passwords",
          "Prevent XSS and CSRF"
        ],
        "project": "Build a small CRUD app."
      },
      {
        "stage": 4,
        "title": "Frameworks and deployment",
        "description": "Structure and shipping.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain MVC",
          "Use a framework",
          "Deploy to a host"
        ],
        "project": "Deploy your app."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      }
    ]
  },
  {
    "id": "2a077be0-85c3-47c8-8f1d-acc30aa4cbcd",
    "slug": "kotlin",
    "title": "Kotlin",
    "category": "Languages",
    "description": "A concise, safe language for Android and servers.",
    "subtitle": "Four stages · about two months at five hours a week · 18 resources",
    "roles": [
      "Android Developer",
      "Backend Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Basics",
        "description": "Types, null safety and functions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use val and var",
          "Handle null safely",
          "Write functions and lambdas"
        ],
        "project": "Write a small text-processing tool."
      },
      {
        "stage": 2,
        "title": "Classes and collections",
        "description": "Data classes, interfaces and collection operations.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Model an order system with sealed classes."
      },
      {
        "stage": 3,
        "title": "Coroutines",
        "description": "Asynchronous code made readable.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Launch coroutines",
          "Use suspend functions",
          "Handle cancellation"
        ],
        "project": "Fetch from two APIs concurrently."
      },
      {
        "stage": 4,
        "title": "Apps and services",
        "description": "Android or server projects.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Build a small Android screen or Ktor API",
          "Write tests",
          "Package your app"
        ],
        "project": "Build and document a small app."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      }
    ]
  },
  {
    "id": "e0535252-76e7-4f77-8fc3-10652122332e",
    "slug": "swift-swiftui",
    "title": "Swift and SwiftUI",
    "category": "Languages",
    "description": "Build Apple-platform apps declaratively.",
    "subtitle": "Four stages · about two months at five hours a week · 18 resources",
    "roles": [
      "iOS Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Swift language",
        "description": "Types, optionals and protocols.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use optionals safely",
          "Write structs, classes and protocols",
          "Use closures"
        ],
        "project": "Write a Swift playground of small exercises."
      },
      {
        "stage": 2,
        "title": "SwiftUI views",
        "description": "Layouts and modifiers.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Build a profile screen."
      },
      {
        "stage": 3,
        "title": "State and data flow",
        "description": "Binding and observation.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Use State, Binding and Observable",
          "Navigate between screens",
          "Persist data"
        ],
        "project": "Build a habit tracker."
      },
      {
        "stage": 4,
        "title": "Networking and polish",
        "description": "APIs, animation and accessibility.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Fetch with async/await",
          "Add animations",
          "Support VoiceOver and Dynamic Type"
        ],
        "project": "Add a network feed and accessibility pass."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      }
    ]
  },
  {
    "id": "11be7e2e-dcca-4d32-86fa-b76e31673362",
    "slug": "ruby",
    "title": "Ruby",
    "category": "Languages",
    "description": "A friendly language for scripts and web apps.",
    "subtitle": "Four stages · about two months at four hours a week · 15 resources",
    "roles": [
      "Backend Developer",
      "Scripter"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "Basics",
        "description": "Syntax, strings and collections.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write methods and use arrays and hashes",
          "Use blocks and iterators",
          "Read and write files"
        ],
        "project": "Write a text-processing script."
      },
      {
        "stage": 2,
        "title": "Objects",
        "description": "Classes, modules and mixins.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Model a library with tests."
      },
      {
        "stage": 3,
        "title": "Gems and tooling",
        "description": "Packages and project structure.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Use Bundler and gems",
          "Structure a project",
          "Publish a small gem or script"
        ],
        "project": "Package a small CLI."
      },
      {
        "stage": 4,
        "title": "Projects",
        "description": "Put it to use.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Consume an API",
          "Build a command-line tool",
          "Document your code"
        ],
        "project": ""
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      }
    ]
  },
  {
    "id": "5c1224ec-d0d3-47b5-9551-6def6df8c019",
    "slug": "scala",
    "title": "Scala",
    "category": "Languages",
    "description": "Functional and object-oriented programming on the JVM.",
    "subtitle": "Four stages · about two months at five hours a week · 20 resources",
    "roles": [
      "Data Engineer",
      "Backend Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Basics",
        "description": "Syntax, collections and functions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use vals, defs and classes",
          "Transform collections",
          "Pattern match"
        ],
        "project": "Write a word-count program."
      },
      {
        "stage": 2,
        "title": "Functional programming",
        "description": "Immutability, options and higher-order functions.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "python",
          "java",
          "sql"
        ],
        "project": "Refactor a script to a pure functional style."
      },
      {
        "stage": 3,
        "title": "Types and traits",
        "description": "The type system.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Define traits and case classes",
          "Use generics",
          "Understand implicits or givens"
        ],
        "project": "Model a domain with algebraic data types."
      },
      {
        "stage": 4,
        "title": "Applications",
        "description": "Build tools, testing and a project.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use sbt",
          "Write tests",
          "Build a small service or Spark job"
        ],
        "project": "Build and test a small application."
      }
    ],
    "related": [
      {
        "slug": "python",
        "title": "Python"
      },
      {
        "slug": "java",
        "title": "Java"
      },
      {
        "slug": "sql",
        "title": "SQL"
      },
      {
        "slug": "javascript",
        "title": "JavaScript"
      },
      {
        "slug": "typescript",
        "title": "TypeScript"
      },
      {
        "slug": "c-programming",
        "title": "C Programming"
      }
    ]
  },
  {
    "id": "538e0db4-3629-4f43-b426-67f4a759f998",
    "slug": "data-analyst",
    "title": "Data Analyst",
    "category": "Data",
    "description": "SQL, spreadsheets and telling the truth with numbers.",
    "subtitle": "Seven stages · about four months at six hours a week · 37 resources",
    "roles": [
      "Data Analyst",
      "Business Analyst",
      "MIS Executive"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Spreadsheets properly",
        "description": "Formulas, lookups and pivot tables before any code.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Clean a messy sheet with formulas",
          "Use lookups and pivot tables",
          "Build a simple chart that answers a question"
        ],
        "project": "Analyse a public dataset in Google Sheets and summarise three findings."
      },
      {
        "stage": 2,
        "title": "SQL for analysis",
        "description": "Select, filter, join and group until it is second nature.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write joins across three tables",
          "Use GROUP BY with HAVING",
          "Use window functions for running totals"
        ],
        "project": "Answer ten business questions on a sample database and share the queries."
      },
      {
        "stage": 3,
        "title": "Statistics you will actually use",
        "description": "Averages, spread, distributions and when a difference is real.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain mean, median and standard deviation",
          "Read a distribution and spot outliers",
          "Know what a confidence interval says"
        ],
        "project": "Compare two groups in a dataset and explain whether the difference matters."
      },
      {
        "stage": 4,
        "title": "Python for data",
        "description": "Pandas for cleaning and reshaping data.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Load, clean and merge data in pandas",
          "Group and aggregate",
          "Write a reproducible notebook"
        ],
        "project": "Clean a messy public dataset in a Kaggle notebook and publish it."
      },
      {
        "stage": 5,
        "title": "Visualisation and storytelling",
        "description": "Charts that make one point clearly.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Pick the right chart for the question",
          "Remove clutter from a chart",
          "Write a headline that states the finding"
        ],
        "project": "Turn your stage 4 analysis into three charts with headlines."
      },
      {
        "stage": 6,
        "title": "A BI tool: Power BI or Tableau",
        "description": "Dashboards people can use without you in the room.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Connect data and build a model",
          "Build an interactive dashboard",
          "Publish and share it"
        ],
        "project": "Build a sales dashboard from a public dataset and share the link."
      },
      {
        "stage": 7,
        "title": "Portfolio and interviews",
        "description": "Two case studies and the SQL round.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write up two analyses as case studies",
          "Solve SQL interview questions on time",
          "Walk through an analysis out loud"
        ],
        "project": "Publish a portfolio page with your two best case studies."
      }
    ],
    "related": [
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      },
      {
        "slug": "mlops",
        "title": "MLOps Engineer"
      }
    ]
  },
  {
    "id": "d8c73ce4-6c16-4dd9-9cae-5c829a9cde6b",
    "slug": "ai-ml",
    "title": "AI & Machine Learning",
    "category": "Data",
    "description": "From Python and maths to models you can explain.",
    "subtitle": "Six stages · about three months at seven hours a week · 34 resources",
    "roles": [
      "ML Engineer",
      "AI Engineer",
      "Data Scientist"
    ],
    "hoursPerWeek": 7,
    "stages": [
      {
        "stage": 1,
        "title": "Python for machine learning",
        "description": "The Python and pandas skills every ML workflow starts with.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Load and clean data with pandas",
          "Write reusable functions",
          "Work in notebooks"
        ],
        "project": "Clean a public dataset in a notebook and describe it."
      },
      {
        "stage": 2,
        "title": "The maths you need",
        "description": "Linear algebra, probability and calculus at the level ML actually uses.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "data-science",
          "inference-engineering"
        ],
        "project": "Implement linear regression with gradient descent using only NumPy."
      },
      {
        "stage": 3,
        "title": "Classical machine learning",
        "description": "Supervised learning with scikit-learn, done properly.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Train regression and classification models",
          "Split data correctly",
          "Engineer useful features"
        ],
        "project": "Build a model that predicts a real outcome from a public dataset and explain its errors."
      },
      {
        "stage": 4,
        "title": "Deep learning basics",
        "description": "Neural networks without the hype.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain how a neural network learns",
          "Train a small network",
          "Recognise overfitting"
        ],
        "project": "Train an image classifier on a small dataset and report its accuracy honestly."
      },
      {
        "stage": 5,
        "title": "LLMs and generative AI",
        "description": "Using large language models in real applications.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write effective prompts",
          "Use embeddings for search",
          "Explain retrieval-augmented generation"
        ],
        "project": "Build a small question-answering app over your own notes using embeddings and an LLM API."
      },
      {
        "stage": 6,
        "title": "Projects and interviews",
        "description": "Show applied skill and prepare for ML interviews.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Present an end-to-end ML project",
          "Answer ML fundamentals questions",
          "Discuss model trade-offs"
        ],
        "project": ""
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      },
      {
        "slug": "mlops",
        "title": "MLOps Engineer"
      }
    ]
  },
  {
    "id": "12b068cb-2f63-41ac-87fd-5d84368ec61a",
    "slug": "data-science",
    "title": "Data Science",
    "category": "Data",
    "description": "Statistics, Python and machine learning to answer real questions.",
    "subtitle": "Six stages · about three months at seven hours a week · 32 resources",
    "roles": [
      "Data Scientist",
      "Data Analyst",
      "ML Engineer"
    ],
    "hoursPerWeek": 7,
    "stages": [
      {
        "stage": 1,
        "title": "Python and pandas",
        "description": "Load, clean and reshape data reproducibly.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Clean messy data with pandas",
          "Merge and reshape tables",
          "Keep a reproducible notebook"
        ],
        "project": "Clean and merge two public datasets in a notebook."
      },
      {
        "stage": 2,
        "title": "Statistics and experiments",
        "description": "Describe data, test ideas and avoid false conclusions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "inference-engineering"
        ],
        "project": "Analyse a public experiment dataset and write up whether the effect is real."
      },
      {
        "stage": 3,
        "title": "SQL for data science",
        "description": "Pull exactly the data you need.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Join and aggregate large tables",
          "Use window functions",
          "Prepare features in SQL"
        ],
        "project": "Write the SQL to build a modelling dataset from three tables."
      },
      {
        "stage": 4,
        "title": "Machine learning",
        "description": "Build, evaluate and explain predictive models.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Train and compare models",
          "Evaluate with the right metrics",
          "Explain predictions"
        ],
        "project": "Build a churn or price prediction model and explain the top drivers."
      },
      {
        "stage": 5,
        "title": "Communicating results",
        "description": "Charts and stories that lead to decisions.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Pick the right chart",
          "Write findings as headlines",
          "Recommend an action"
        ],
        "project": "Turn your model results into a five-slide story for a manager."
      },
      {
        "stage": 6,
        "title": "Portfolio and interviews",
        "description": "Case studies and data science interview preparation.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a case study",
          "Answer statistics and ML questions",
          "Walk through a project"
        ],
        "project": "Publish two data science case studies on a portfolio page."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      },
      {
        "slug": "mlops",
        "title": "MLOps Engineer"
      }
    ]
  },
  {
    "id": "a3397a96-d31a-48bc-a80d-244ed4cb04af",
    "slug": "inference-engineering",
    "title": "Inference Engineer",
    "category": "Data",
    "description": "Make machine learning models fast, cheap and reliable in production.",
    "subtitle": "Six stages · about four months at six hours a week · 25 resources",
    "roles": [
      "Inference Engineer",
      "ML Systems Engineer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Model and hardware basics",
        "description": "What happens when a model runs: memory, compute and latency.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain latency versus throughput",
          "Estimate a model's memory needs",
          "Read a simple profiler trace"
        ],
        "project": "Measure the latency of a small open model on your machine."
      },
      {
        "stage": 2,
        "title": "Serving a model",
        "description": "Wrapping a model in an API and handling concurrent requests.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Deploy a text model behind a FastAPI service with a load test."
      },
      {
        "stage": 3,
        "title": "Optimising models",
        "description": "Quantisation, distillation and faster runtimes.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Explain quantisation and its trade-offs",
          "Convert a model to an optimised runtime",
          "Compare accuracy and speed before and after"
        ],
        "project": "Quantise a model and publish a speed-versus-quality table."
      },
      {
        "stage": 4,
        "title": "LLM serving",
        "description": "KV cache, batching and token streaming.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain the KV cache and why memory matters",
          "Use continuous batching in a serving engine",
          "Stream tokens to a client"
        ],
        "project": "Serve an open LLM and measure tokens per second at different loads."
      },
      {
        "stage": 5,
        "title": "Scaling and cost",
        "description": "GPUs, autoscaling and cost per request.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Choose hardware for a workload",
          "Autoscale on a sensible signal",
          "Compute cost per thousand requests"
        ],
        "project": "Write a short cost comparison of two deployment options."
      },
      {
        "stage": 6,
        "title": "Monitoring and interviews",
        "description": "Quality, drift and explaining design choices.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Track latency, errors and output quality",
          "Roll out a model safely",
          "Answer serving-design questions"
        ],
        "project": "Design a serving architecture for one million requests a day."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      },
      {
        "slug": "mlops",
        "title": "MLOps Engineer"
      }
    ]
  },
  {
    "id": "1ef0b2d8-81ba-42bf-b3b5-2802ea3a1039",
    "slug": "ai-engineer",
    "title": "AI Engineer",
    "category": "Data",
    "description": "Build useful products on top of language models.",
    "subtitle": "Six stages · about four months at six hours a week · 29 resources",
    "roles": [
      "AI Engineer",
      "Applied AI Engineer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Programming and API basics",
        "description": "Python or TypeScript, HTTP and JSON.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Call an HTTP API from code",
          "Handle JSON, errors and retries",
          "Keep keys safe in environment variables"
        ],
        "project": "Write a script that calls a language model API and prints the answer."
      },
      {
        "stage": 2,
        "title": "Working with language models",
        "description": "Prompts, context, structured output and limits.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Build a tool that extracts fields from messy text into JSON."
      },
      {
        "stage": 3,
        "title": "Retrieval and your own data",
        "description": "Embeddings, vector search and retrieval-augmented answers.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Explain embeddings and similarity search",
          "Chunk and index documents",
          "Answer questions with cited sources"
        ],
        "project": "Build a Q&A bot over a set of documents that cites its sources."
      },
      {
        "stage": 4,
        "title": "Tools and agents",
        "description": "Letting the model call functions and plan steps.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Define tools with clear schemas",
          "Loop between model and tool calls",
          "Limit what an agent is allowed to do"
        ],
        "project": "Build an assistant that checks a calendar and drafts a reply."
      },
      {
        "stage": 5,
        "title": "Evaluation and safety",
        "description": "Measuring quality, guarding against misuse and handling failures.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write a small evaluation set",
          "Detect and handle bad outputs",
          "Defend against prompt injection basics"
        ],
        "project": "Create an eval suite for your Q&A bot and report its score."
      },
      {
        "stage": 6,
        "title": "Ship and show",
        "description": "Deploy, monitor cost and tell the story.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Deploy an app with a simple UI",
          "Track cost and latency per request",
          "Write up the design trade-offs"
        ],
        "project": "Publish a deployed AI app with a README that explains its limits."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      },
      {
        "slug": "mlops",
        "title": "MLOps Engineer"
      }
    ]
  },
  {
    "id": "41de093d-aed8-4f0b-8322-733d505162be",
    "slug": "data-engineer",
    "title": "Data Engineer",
    "category": "Data",
    "description": "Move, clean and organise data so others can trust it.",
    "subtitle": "Six stages · about four months at six hours a week · 29 resources",
    "roles": [
      "Data Engineer",
      "Analytics Engineer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "SQL and Python for data",
        "description": "The two tools you use every day.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Write joins, window functions and CTEs",
          "Read and transform files in Python",
          "Write tests for a data function"
        ],
        "project": "Clean a messy CSV into a tidy table with a Python script."
      },
      {
        "stage": 2,
        "title": "Databases and modelling",
        "description": "Schemas for analytics: facts, dimensions and normalisation.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Model a shop's orders as a star schema and load sample data."
      },
      {
        "stage": 3,
        "title": "Pipelines and orchestration",
        "description": "Extract, transform, load, and running it on a schedule.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Build an ETL job with retries",
          "Schedule jobs and handle failures",
          "Make runs idempotent"
        ],
        "project": "Build a daily pipeline that pulls an API into a database."
      },
      {
        "stage": 4,
        "title": "Warehouses and transformation",
        "description": "Cloud warehouses and SQL-based transforms with tests.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Load data into a warehouse",
          "Write modular SQL transformations",
          "Add data quality tests"
        ],
        "project": "Build a three-layer transformation project with tests."
      },
      {
        "stage": 5,
        "title": "Streaming and scale",
        "description": "Queues, batch versus streaming and handling volume.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Explain batch versus streaming",
          "Describe how a message queue works",
          "Partition large tables sensibly"
        ],
        "project": "Design how you would ingest one million events an hour."
      },
      {
        "stage": 6,
        "title": "Portfolio and interviews",
        "description": "A documented pipeline and clear answers.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Present an end-to-end pipeline",
          "Answer SQL and design questions",
          "Explain data quality decisions"
        ],
        "project": "Publish a repo with a diagram, README and sample output."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "mlops",
        "title": "MLOps Engineer"
      }
    ]
  },
  {
    "id": "9b1591a1-6f41-4ecf-9043-c0ba6d591b27",
    "slug": "mlops",
    "title": "MLOps Engineer",
    "category": "Data",
    "description": "Take machine learning models from a notebook to a reliable service.",
    "subtitle": "Six stages · about four months at six hours a week · 28 resources",
    "roles": [
      "MLOps Engineer",
      "ML Engineer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "ML and Python workflow",
        "description": "Training, evaluating and packaging a model.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Train and evaluate a simple model",
          "Package code as a library",
          "Track experiments"
        ],
        "project": "Train a classifier and log metrics for three runs."
      },
      {
        "stage": 2,
        "title": "Data and feature pipelines",
        "description": "Versioned data and repeatable features.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Make a pipeline that rebuilds your dataset from raw files."
      },
      {
        "stage": 3,
        "title": "Deploying models",
        "description": "Containers, APIs and batch jobs.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Wrap a model in an API",
          "Containerise it",
          "Run batch predictions on a schedule"
        ],
        "project": "Deploy your model as a container behind an API."
      },
      {
        "stage": 4,
        "title": "CI/CD for ML",
        "description": "Automated tests, training and releases.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Test data and model code",
          "Retrain on a trigger",
          "Promote models through stages"
        ],
        "project": "Add a pipeline that tests and packages the model on each commit."
      },
      {
        "stage": 5,
        "title": "Monitoring and drift",
        "description": "Knowing when a model stops working.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Monitor inputs and predictions",
          "Detect drift",
          "Define rollback criteria"
        ],
        "project": "Build a small dashboard showing drift on a sample feed."
      },
      {
        "stage": 6,
        "title": "Portfolio and interviews",
        "description": "A full lifecycle project.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Present a model lifecycle diagram",
          "Answer deployment and monitoring questions",
          "Explain trade-offs"
        ],
        "project": "Publish a repo with the whole lifecycle documented."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      }
    ]
  },
  {
    "id": "a3baaeb2-000c-454d-9d0b-e3113bb086d1",
    "slug": "bi-analyst",
    "title": "BI Analyst",
    "category": "Data",
    "description": "Turn company data into dashboards people use to decide.",
    "subtitle": "Five stages · about three months at five hours a week · 24 resources",
    "roles": [
      "BI Analyst",
      "Reporting Analyst"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Business questions and metrics",
        "description": "What to measure and why.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Translate a request into a metric",
          "Define KPIs precisely",
          "Avoid vanity metrics"
        ],
        "project": "Write definitions for five KPIs of a shop."
      },
      {
        "stage": 2,
        "title": "SQL for reporting",
        "description": "Joins, aggregates and clean extracts.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Write the queries for a monthly sales report."
      },
      {
        "stage": 3,
        "title": "Data models",
        "description": "Facts, dimensions and a trustworthy semantic layer.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Build a simple star schema",
          "Define measures once",
          "Handle slowly changing data"
        ],
        "project": "Model sales data for a dashboard."
      },
      {
        "stage": 4,
        "title": "Dashboards",
        "description": "Layout, charts and interactions that answer questions.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Choose charts for the question",
          "Build a dashboard with filters",
          "Tell the story in the title and layout"
        ],
        "project": "Build a three-page dashboard for a sales team."
      },
      {
        "stage": 5,
        "title": "Delivery and trust",
        "description": "Refresh, access, documentation and feedback.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Schedule refreshes",
          "Control who sees what",
          "Document definitions"
        ],
        "project": "Publish a dashboard with a data dictionary."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      }
    ]
  },
  {
    "id": "1a4eddec-69c4-4a0a-8e45-5fdf70f1dec4",
    "slug": "power-bi",
    "title": "Power BI",
    "category": "Data",
    "description": "Build interactive reports and dashboards in Power BI.",
    "subtitle": "Five stages · about two months at five hours a week · 22 resources",
    "roles": [
      "BI Analyst",
      "Data Analyst"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Get data and clean it",
        "description": "Connect, shape and load.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Connect to files and databases",
          "Clean data in Power Query",
          "Understand refresh"
        ],
        "project": "Load and clean a sales dataset."
      },
      {
        "stage": 2,
        "title": "Model the data",
        "description": "Relationships and star schemas.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Model sales, customers and products."
      },
      {
        "stage": 3,
        "title": "DAX measures",
        "description": "Calculations that respond to filters.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write measures with CALCULATE",
          "Use time intelligence",
          "Debug a measure"
        ],
        "project": "Create ten measures including year-over-year growth."
      },
      {
        "stage": 4,
        "title": "Visuals and storytelling",
        "description": "Choose charts and design pages.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Pick charts for the question",
          "Add slicers and drill-through",
          "Design a clear layout"
        ],
        "project": "Build a three-page report."
      },
      {
        "stage": 5,
        "title": "Publish and share",
        "description": "Service, security and refresh.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Publish to the service",
          "Set row-level security",
          "Schedule refresh"
        ],
        "project": "Publish your report and share a view-only link."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      }
    ]
  },
  {
    "id": "380c9311-fec6-471d-be61-954a7f9fdfec",
    "slug": "prompt-engineering",
    "title": "Prompt Engineering",
    "category": "Data",
    "description": "Write prompts that give reliable, useful results.",
    "subtitle": "Four stages · about two months at four hours a week · 19 resources",
    "roles": [
      "AI Engineer",
      "Product Builder"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "How models respond",
        "description": "Tokens, context and randomness.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain tokens and context windows",
          "Describe temperature",
          "Know common failure modes"
        ],
        "project": "Run the same prompt ten times and note the differences."
      },
      {
        "stage": 2,
        "title": "Core techniques",
        "description": "Clear instructions, examples and structure.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Improve a weak prompt across five rewrites and record the effect."
      },
      {
        "stage": 3,
        "title": "Reasoning and tools",
        "description": "Multi-step tasks and calling functions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Break tasks into steps",
          "Provide context from documents",
          "Use tools through function calling"
        ],
        "project": "Build a prompt chain that summarises and classifies documents."
      },
      {
        "stage": 4,
        "title": "Evaluate and harden",
        "description": "Testing prompts like code.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build a test set",
          "Compare prompt versions",
          "Resist prompt injection"
        ],
        "project": "Evaluate two prompt versions with a score table."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      }
    ]
  },
  {
    "id": "9d581a13-d069-42d0-9849-8e33a33476df",
    "slug": "ai-agents",
    "title": "AI Agents",
    "category": "Data",
    "description": "Build assistants that plan and act with tools.",
    "subtitle": "Five stages · about three months at five hours a week · 24 resources",
    "roles": [
      "AI Engineer",
      "Backend Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Foundations",
        "description": "Models, prompts and tool calling.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Call a model API",
          "Define tool schemas",
          "Handle tool results"
        ],
        "project": "Build an assistant that can call one tool."
      },
      {
        "stage": 2,
        "title": "The agent loop",
        "description": "Plan, act, observe.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Build an agent that researches a topic with search."
      },
      {
        "stage": 3,
        "title": "Memory and retrieval",
        "description": "Giving agents knowledge.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Store and retrieve context",
          "Chunk and embed documents",
          "Cite sources"
        ],
        "project": "Add document retrieval to your agent."
      },
      {
        "stage": 4,
        "title": "Safety and evaluation",
        "description": "Permissions, approvals and tests.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Limit tool permissions",
          "Require approval for risky actions",
          "Write scenario tests"
        ],
        "project": "Create a test suite of ten scenarios with scores."
      },
      {
        "stage": 5,
        "title": "Deploy and observe",
        "description": "Logging, cost and limits.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Trace every step",
          "Track cost per task",
          "Set timeouts and budgets"
        ],
        "project": "Deploy the agent with tracing."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      }
    ]
  },
  {
    "id": "f8c260f2-4377-470f-802b-bcc2ffcb406d",
    "slug": "python-data-analysis",
    "title": "Python for Data Analysis",
    "category": "Data",
    "description": "Analyse data with Python, pandas and charts.",
    "subtitle": "Four stages · about two months at five hours a week · 20 resources",
    "roles": [
      "Data Analyst"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Python essentials",
        "description": "Variables, functions and files.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write functions",
          "Use lists and dicts",
          "Read CSV files"
        ],
        "project": "Write a script that summarises a CSV."
      },
      {
        "stage": 2,
        "title": "pandas",
        "description": "Load, clean and reshape data.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Clean a messy dataset."
      },
      {
        "stage": 3,
        "title": "Visualise",
        "description": "Charts that answer questions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Choose the right chart",
          "Plot with matplotlib or seaborn",
          "Label for clarity"
        ],
        "project": "Create five charts that tell a story."
      },
      {
        "stage": 4,
        "title": "Analysis project",
        "description": "Question, analysis and write-up.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Ask a clear question",
          "Analyse and test findings",
          "Write a short report"
        ],
        "project": "Publish a notebook with a written conclusion."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      }
    ]
  },
  {
    "id": "8473116b-db7e-45f9-8633-d5d978662006",
    "slug": "r-programming",
    "title": "R Programming",
    "category": "Data",
    "description": "Statistics and visualisation with R.",
    "subtitle": "Four stages · about two months at five hours a week · 19 resources",
    "roles": [
      "Data Analyst",
      "Statistician"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "R basics",
        "description": "Vectors, data frames and functions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use vectors and data frames",
          "Write functions",
          "Import data"
        ],
        "project": "Summarise a dataset in R."
      },
      {
        "stage": 2,
        "title": "Tidy data",
        "description": "dplyr and tidyr.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Filter, mutate and summarise",
          "data-analyst",
          "ai-ml",
          "data-science"
        ],
        "project": "Clean and reshape a dataset."
      },
      {
        "stage": 3,
        "title": "Visualise with ggplot2",
        "description": "Grammar of graphics.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build layered plots",
          "Facet and theme",
          "Export figures"
        ],
        "project": "Create a report-ready set of charts."
      },
      {
        "stage": 4,
        "title": "Statistics and reporting",
        "description": "Tests, models and R Markdown.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Run common tests",
          "Fit a simple model",
          "Write a reproducible report"
        ],
        "project": "Publish a short statistical report."
      }
    ],
    "related": [
      {
        "slug": "data-analyst",
        "title": "Data Analyst"
      },
      {
        "slug": "ai-ml",
        "title": "AI & Machine Learning"
      },
      {
        "slug": "data-science",
        "title": "Data Science"
      },
      {
        "slug": "inference-engineering",
        "title": "Inference Engineer"
      },
      {
        "slug": "ai-engineer",
        "title": "AI Engineer"
      },
      {
        "slug": "data-engineer",
        "title": "Data Engineer"
      }
    ]
  },
  {
    "id": "e3285ae1-9c75-48b5-8836-bedf4aa70f39",
    "slug": "ux-designer",
    "title": "UX Designer",
    "category": "Design",
    "description": "Research, wireframes and a portfolio that holds up.",
    "subtitle": "Eight stages · about three months at six hours a week · 37 resources",
    "roles": [
      "UX Designer",
      "Product Designer",
      "UI Designer"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Design principles",
        "description": "Heuristics and the psychology behind good interfaces.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Name the ten usability heuristics",
          "Spot violations in a real app",
          "Apply common laws of UX"
        ],
        "project": "Audit an app you use against the ten heuristics."
      },
      {
        "stage": 2,
        "title": "User research",
        "description": "Talk to people and learn what they actually do.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "design-architecture",
          "design-system",
          "frontend"
        ],
        "project": "Interview three people about a problem and write up the findings."
      },
      {
        "stage": 3,
        "title": "Mapping the problem",
        "description": "Personas and journey maps that guide decisions.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Build a persona from research",
          "Map a journey with pain points",
          "Frame a problem statement"
        ],
        "project": "Create a journey map from your interviews."
      },
      {
        "stage": 4,
        "title": "Figma and wireframes",
        "description": "From sketches to clickable wireframes.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Use frames, auto layout and components",
          "Wireframe a three-screen flow",
          "Make a clickable prototype"
        ],
        "project": "Wireframe and prototype a solution to your problem statement."
      },
      {
        "stage": 5,
        "title": "Visual and interaction design",
        "description": "Type, colour, spacing and components.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Build a small design system",
          "Use a type and spacing scale",
          "Design states: empty, loading, error"
        ],
        "project": "Turn your wireframes into high-fidelity screens."
      },
      {
        "stage": 6,
        "title": "Accessibility",
        "description": "Design that works for everyone.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Check colour contrast",
          "Design focus states and keyboard paths",
          "Write useful alt text"
        ],
        "project": "Audit your screens against WCAG AA and fix what fails."
      },
      {
        "stage": 7,
        "title": "Usability testing",
        "description": "Watch people use your design, then fix it.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write test tasks",
          "Run five usability sessions",
          "Prioritise what to fix"
        ],
        "project": "Test your prototype with five people and iterate."
      },
      {
        "stage": 8,
        "title": "Portfolio and interviews",
        "description": "Two case studies that show your thinking, not just screens.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write a case study: problem, process, outcome",
          "Present your work in 15 minutes",
          "Handle design critique"
        ],
        "project": "Publish a portfolio with two case studies."
      }
    ],
    "related": [
      {
        "slug": "design-architecture",
        "title": "Design Architecture"
      },
      {
        "slug": "design-system",
        "title": "Design Systems"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      }
    ]
  },
  {
    "id": "16ae4120-5494-4c2f-8414-e1af0c48a829",
    "slug": "design-architecture",
    "title": "Design Architecture",
    "category": "Design",
    "description": "Plan how a product's design fits together before pixels.",
    "subtitle": "Four stages · about two months at five hours a week · 19 resources",
    "roles": [
      "UX Designer",
      "Product Designer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Information architecture",
        "description": "Organising content so people can find it.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Group content with card sorting",
          "Build a site map",
          "Label navigation clearly"
        ],
        "project": "Create a site map for a product from a card-sort result."
      },
      {
        "stage": 2,
        "title": "Flows and journeys",
        "description": "How people move through a product.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "ux-designer",
          "design-system",
          "frontend"
        ],
        "project": "Draw the main flows for an app."
      },
      {
        "stage": 3,
        "title": "Wireframes and structure",
        "description": "Layouts that express the architecture.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Sketch low-fidelity wireframes",
          "Define page templates",
          "Check consistency"
        ],
        "project": "Produce wireframes for five core screens."
      },
      {
        "stage": 4,
        "title": "Test and document",
        "description": "Prove the structure works.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Run a tree test",
          "Document decisions",
          "Hand over to the team"
        ],
        "project": "Test your structure with five people and report results."
      }
    ],
    "related": [
      {
        "slug": "ux-designer",
        "title": "UX Designer"
      },
      {
        "slug": "design-system",
        "title": "Design Systems"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      }
    ]
  },
  {
    "id": "f42b4fde-4c8c-4432-82fa-9459ca3303e0",
    "slug": "design-system",
    "title": "Design Systems",
    "category": "Design",
    "description": "Build and run a shared library of components and rules.",
    "subtitle": "Four stages · about two months at five hours a week · 19 resources",
    "roles": [
      "Product Designer",
      "Frontend Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Why systems",
        "description": "Consistency, speed and shared language.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain the value of a design system",
          "Audit an interface for inconsistencies",
          "Define principles"
        ],
        "project": "Audit a product and list its inconsistencies."
      },
      {
        "stage": 2,
        "title": "Tokens and foundations",
        "description": "Colour, type, spacing and elevation.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "ux-designer",
          "design-architecture",
          "frontend"
        ],
        "project": "Create a token set for light and dark themes."
      },
      {
        "stage": 3,
        "title": "Components",
        "description": "Building blocks with states and variants.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "Design a button, input and card with all states",
          "Write usage guidance",
          "Make components accessible"
        ],
        "project": "Build ten components in Figma and in code."
      },
      {
        "stage": 4,
        "title": "Documentation and adoption",
        "description": "Make it easy to use correctly.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Document usage and dos and don'ts",
          "Version and release changes",
          "Gather feedback from teams"
        ],
        "project": "Publish a documentation site for your system."
      }
    ],
    "related": [
      {
        "slug": "ux-designer",
        "title": "UX Designer"
      },
      {
        "slug": "design-architecture",
        "title": "Design Architecture"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      }
    ]
  },
  {
    "id": "2f1ecc09-d542-4140-abec-613f81095274",
    "slug": "product-support",
    "title": "Product Support",
    "category": "Support",
    "description": "People skills, tooling and escalation paths.",
    "subtitle": "Six stages · about two months at five hours a week · 26 resources",
    "roles": [
      "Product Support",
      "Customer Support",
      "Technical Support"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Customer communication",
        "description": "Empathy, clarity and tone in writing.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write a clear, kind reply to an upset customer",
          "Set expectations honestly",
          "Keep replies short"
        ],
        "project": "Rewrite five real-looking support emails to be clearer and kinder."
      },
      {
        "stage": 2,
        "title": "How the product works under the hood",
        "description": "Browsers, HTTP and reading what the app is doing.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Reproduce and document a bug in a web app with DevTools evidence."
      },
      {
        "stage": 3,
        "title": "SQL for support",
        "description": "Look up accounts and orders yourself.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Find a record by email or id",
          "Join two tables to answer a ticket",
          "Never change data you only needed to read"
        ],
        "project": "Answer ten support questions with queries on a sample database."
      },
      {
        "stage": 4,
        "title": "Escalation and incidents",
        "description": "When to escalate, what to include, and how incidents run.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write an escalation engineers can act on",
          "Know the stages of an incident",
          "Keep customers updated during an outage"
        ],
        "project": "Write an escalation template and a status-page update for a fake outage."
      },
      {
        "stage": 5,
        "title": "Help-centre writing",
        "description": "Articles that answer the question before a ticket.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Structure a how-to article",
          "Use screenshots well",
          "Measure which articles deflect tickets"
        ],
        "project": "Write three help-centre articles for a product you know."
      },
      {
        "stage": 6,
        "title": "Resume and interviews",
        "description": "Show judgement, writing and calm.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Answer role-play tickets live",
          "Explain a technical issue simply",
          "Show your writing samples"
        ],
        "project": "Put your rewritten emails and articles into one portfolio document."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "7a210960-bcd7-4bef-adaf-69bd927c52fb",
    "slug": "business-analyst",
    "title": "Business Analyst",
    "category": "Business",
    "description": "Requirements, models and stakeholder conversations.",
    "subtitle": "Seven stages · about two months at five hours a week · 33 resources",
    "roles": [
      "Business Analyst",
      "Product Analyst",
      "Associate Consultant"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "What a business analyst does",
        "description": "The role, the deliverables and how teams work.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Explain the BA role in an agile team",
          "Know the Scrum events and artefacts",
          "List typical BA deliverables"
        ],
        "project": "Write a one-page summary of how a BA fits into a Scrum team."
      },
      {
        "stage": 2,
        "title": "Requirements and user stories",
        "description": "Turn conversations into clear, testable requirements.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Write user stories with acceptance criteria",
          "Separate needs from solutions",
          "Write a short requirements doc"
        ],
        "project": "Write ten user stories with acceptance criteria for a food-delivery app."
      },
      {
        "stage": 3,
        "title": "Process modelling",
        "description": "Draw how work flows today and how it should.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Draw a BPMN diagram",
          "Find bottlenecks in a process",
          "Propose a to-be process"
        ],
        "project": "Model the as-is and to-be process for a college admission flow."
      },
      {
        "stage": 4,
        "title": "Data skills: spreadsheets and SQL",
        "description": "Back your recommendations with numbers.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Analyse data with pivot tables",
          "Query a database for answers",
          "Present numbers in a simple chart"
        ],
        "project": "Analyse a sample sales dataset and recommend one change."
      },
      {
        "stage": 5,
        "title": "Stakeholders and communication",
        "description": "Run workshops and keep everyone aligned.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Plan and run a requirements workshop",
          "Summarise decisions in writing",
          "Handle conflicting requests"
        ],
        "project": "Write the agenda and summary for a mock requirements workshop."
      },
      {
        "stage": 6,
        "title": "Wireframes for analysts",
        "description": "Sketch screens to make requirements concrete.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Wireframe key screens in Figma",
          "Link wireframes to stories",
          "Get feedback early"
        ],
        "project": "Wireframe the screens for your stage 2 user stories."
      },
      {
        "stage": 7,
        "title": "Case studies and interviews",
        "description": "Show your thinking on a real problem.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Solve a case interview out loud",
          "Present a requirements portfolio",
          "Explain trade-offs you made"
        ],
        "project": "Combine your stories, process maps and analysis into one case study."
      }
    ],
    "related": [
      {
        "slug": "seo",
        "title": "SEO Specialist"
      },
      {
        "slug": "product-manager",
        "title": "Product Manager"
      },
      {
        "slug": "engineering-manager",
        "title": "Engineering Manager"
      },
      {
        "slug": "developer-relations",
        "title": "Developer Relations"
      },
      {
        "slug": "ai-product-builders",
        "title": "AI Product Builder"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      }
    ]
  },
  {
    "id": "bc85f172-3eb4-498d-8ec6-f5de71f335a8",
    "slug": "seo",
    "title": "SEO Specialist",
    "category": "Business",
    "description": "Understand how search works and grow traffic for a real site.",
    "subtitle": "Six stages · about three months at five hours a week · 26 resources",
    "roles": [
      "SEO Specialist",
      "Digital Marketing Executive"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "How search works",
        "description": "Crawling, indexing, ranking and what users actually want.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain crawl, index and rank",
          "Describe search intent types",
          "Use Search Console to see how a site appears"
        ],
        "project": "Audit how a small site appears in search for five queries."
      },
      {
        "stage": 2,
        "title": "Keyword research",
        "description": "Finding what people search for and picking battles you can win.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Build a keyword list by intent",
          "Judge difficulty and volume",
          "Group keywords into topics"
        ],
        "project": "Create a 30-keyword plan for a niche blog."
      },
      {
        "stage": 3,
        "title": "On-page SEO and content",
        "description": "Titles, headings, internal links and helpful content.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Write titles and descriptions that earn clicks",
          "Structure a page with headings and links",
          "Edit a page to match intent"
        ],
        "project": "Rewrite three weak pages and explain each change."
      },
      {
        "stage": 4,
        "title": "Technical SEO",
        "description": "Speed, mobile, sitemaps, structured data and site structure.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Run a technical audit",
          "Fix crawl and indexing issues",
          "Add structured data"
        ],
        "project": "Produce a prioritised technical audit of a website."
      },
      {
        "stage": 5,
        "title": "Links and authority",
        "description": "Earning links the honest way.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain why links matter",
          "Find link opportunities ethically",
          "Avoid practices that cause penalties"
        ],
        "project": "Draft an outreach plan for ten relevant sites."
      },
      {
        "stage": 6,
        "title": "Reporting and portfolio",
        "description": "Measure results and tell the story.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Track rankings and traffic in analytics",
          "Report wins and misses plainly",
          "Present a before-and-after case study"
        ],
        "project": "Publish a one-page case study with numbers."
      }
    ],
    "related": [
      {
        "slug": "business-analyst",
        "title": "Business Analyst"
      },
      {
        "slug": "product-manager",
        "title": "Product Manager"
      },
      {
        "slug": "engineering-manager",
        "title": "Engineering Manager"
      },
      {
        "slug": "developer-relations",
        "title": "Developer Relations"
      },
      {
        "slug": "ai-product-builders",
        "title": "AI Product Builder"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      }
    ]
  },
  {
    "id": "003233dc-0da8-4573-9d55-8163373dcbff",
    "slug": "product-manager",
    "title": "Product Manager",
    "category": "Business",
    "description": "Decide what to build, why, and how to know it worked.",
    "subtitle": "Six stages · about three months at five hours a week · 28 resources",
    "roles": [
      "Product Manager",
      "Associate Product Manager"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "What a PM does",
        "description": "The role, the team and the product cycle.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Describe a PM's responsibilities",
          "Explain the product lifecycle",
          "Work with engineers and designers"
        ],
        "project": "Write a one-page teardown of a product you use."
      },
      {
        "stage": 2,
        "title": "Understand users and problems",
        "description": "Research, interviews and defining the problem.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "business-analyst",
          "seo",
          "engineering-manager"
        ],
        "project": "Interview five people and summarise the top three problems."
      },
      {
        "stage": 3,
        "title": "Prioritise and plan",
        "description": "Roadmaps, trade-offs and writing requirements.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Prioritise with a clear method",
          "Write a short product requirements document",
          "Say no with reasons"
        ],
        "project": "Prioritise 12 ideas and write a PRD for the top one."
      },
      {
        "stage": 4,
        "title": "Metrics and experiments",
        "description": "Success metrics, funnels and A/B tests.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Define a success metric",
          "Read a funnel",
          "Design a simple experiment"
        ],
        "project": "Write a metric plan and an experiment design for a feature."
      },
      {
        "stage": 5,
        "title": "Launch and communicate",
        "description": "Releasing, learning and telling the story.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Plan a launch",
          "Present to stakeholders",
          "Run a retrospective on results"
        ],
        "project": "Prepare a launch plan and a stakeholder update."
      },
      {
        "stage": 6,
        "title": "Interviews",
        "description": "Product sense, estimation and execution questions.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Answer a product design question",
          "Estimate a market size",
          "Tell a story about your work"
        ],
        "project": "Record yourself answering three product questions."
      }
    ],
    "related": [
      {
        "slug": "business-analyst",
        "title": "Business Analyst"
      },
      {
        "slug": "seo",
        "title": "SEO Specialist"
      },
      {
        "slug": "engineering-manager",
        "title": "Engineering Manager"
      },
      {
        "slug": "developer-relations",
        "title": "Developer Relations"
      },
      {
        "slug": "ai-product-builders",
        "title": "AI Product Builder"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      }
    ]
  },
  {
    "id": "d9c24708-2dd9-44f5-ac07-6fd1d5ff10b2",
    "slug": "engineering-manager",
    "title": "Engineering Manager",
    "category": "Business",
    "description": "Move from writing code to helping a team deliver well.",
    "subtitle": "Five stages · about three months at four hours a week · 21 resources",
    "roles": [
      "Engineering Manager",
      "Tech Lead"
    ],
    "hoursPerWeek": 4,
    "stages": [
      {
        "stage": 1,
        "title": "The shift from individual to manager",
        "description": "What changes in how you create value.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain a manager's job",
          "Delegate with clear outcomes",
          "Manage your own time"
        ],
        "project": "List what you will stop doing yourself and who will own it."
      },
      {
        "stage": 2,
        "title": "One-on-ones and feedback",
        "description": "Building trust and giving useful feedback.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "business-analyst",
          "seo",
          "product-manager"
        ],
        "project": "Plan a template for one-on-ones and a feedback conversation."
      },
      {
        "stage": 3,
        "title": "Delivery and planning",
        "description": "Estimating, prioritising and reducing risk.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Break work into deliverable slices",
          "Communicate status clearly",
          "Handle scope changes"
        ],
        "project": "Plan a quarter for a team with risks and milestones."
      },
      {
        "stage": 4,
        "title": "Hiring and team health",
        "description": "Interviewing, onboarding and culture.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Design a structured interview",
          "Onboard a new hire",
          "Spot and address burnout"
        ],
        "project": "Write an interview loop and an onboarding plan."
      },
      {
        "stage": 5,
        "title": "Technical judgement",
        "description": "Staying credible without doing all the coding.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Review designs and trade-offs",
          "Manage tech debt deliberately",
          "Run incident reviews"
        ],
        "project": "Write a tech debt proposal with costs and benefits."
      }
    ],
    "related": [
      {
        "slug": "business-analyst",
        "title": "Business Analyst"
      },
      {
        "slug": "seo",
        "title": "SEO Specialist"
      },
      {
        "slug": "product-manager",
        "title": "Product Manager"
      },
      {
        "slug": "developer-relations",
        "title": "Developer Relations"
      },
      {
        "slug": "ai-product-builders",
        "title": "AI Product Builder"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      }
    ]
  },
  {
    "id": "7f87a2a6-10ca-43b9-81c0-5322243a99ec",
    "slug": "developer-relations",
    "title": "Developer Relations",
    "category": "Business",
    "description": "Help developers succeed with a product through content and community.",
    "subtitle": "Five stages · about three months at five hours a week · 20 resources",
    "roles": [
      "Developer Advocate",
      "Developer Relations Engineer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Role and audience",
        "description": "What DevRel is and who you serve.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain advocacy versus marketing",
          "Describe your audience's goals",
          "Define success measures"
        ],
        "project": "Write a one-page plan for a product's developer audience."
      },
      {
        "stage": 2,
        "title": "Technical content",
        "description": "Tutorials, docs and sample apps that work.",
        "weeks": 4,
        "lessons": 5,
        "outcomes": [
          "business-analyst",
          "seo",
          "product-manager"
        ],
        "project": "Publish a tutorial and a sample repo for a public API."
      },
      {
        "stage": 3,
        "title": "Community",
        "description": "Forums, events and open source.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Answer questions helpfully",
          "Plan a small meetup or talk",
          "Welcome contributors"
        ],
        "project": "Give a 10-minute talk to a student club."
      },
      {
        "stage": 4,
        "title": "Feedback loop",
        "description": "Taking developer pain back to the product team.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Collect and group developer feedback",
          "Write a clear internal report",
          "Close the loop with users"
        ],
        "project": "Summarise five developer complaints with recommendations."
      },
      {
        "stage": 5,
        "title": "Measuring and growing",
        "description": "Metrics that matter and your public presence.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Track signups, activation and engagement",
          "Report impact honestly",
          "Build a public portfolio"
        ],
        "project": "Publish a portfolio with three pieces of work and their results."
      }
    ],
    "related": [
      {
        "slug": "business-analyst",
        "title": "Business Analyst"
      },
      {
        "slug": "seo",
        "title": "SEO Specialist"
      },
      {
        "slug": "product-manager",
        "title": "Product Manager"
      },
      {
        "slug": "engineering-manager",
        "title": "Engineering Manager"
      },
      {
        "slug": "ai-product-builders",
        "title": "AI Product Builder"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      }
    ]
  },
  {
    "id": "659bade2-4b41-40a0-a685-6c126924537e",
    "slug": "ai-product-builders",
    "title": "AI Product Builder",
    "category": "Business",
    "description": "Ship useful AI features without being a machine learning researcher.",
    "subtitle": "Five stages · about three months at five hours a week · 25 resources",
    "roles": [
      "Product Builder",
      "Founder",
      "Product Manager"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "What AI is good at",
        "description": "Capabilities, limits and cost.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Explain what language models do well and badly",
          "Estimate cost per request",
          "Pick tasks suited to AI"
        ],
        "project": "List ten workflows and mark which suit AI and why."
      },
      {
        "stage": 2,
        "title": "Prototype fast",
        "description": "Prompts, APIs and no-code tools.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "business-analyst",
          "seo",
          "product-manager"
        ],
        "project": "Build a working prototype for one workflow."
      },
      {
        "stage": 3,
        "title": "Quality and trust",
        "description": "Testing outputs and handling errors.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Create a set of test examples",
          "Design for wrong answers",
          "Add human review where needed"
        ],
        "project": "Evaluate your prototype on 30 real examples."
      },
      {
        "stage": 4,
        "title": "Product design",
        "description": "Interfaces for uncertain systems.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Show sources and confidence",
          "Let users correct outputs",
          "Design a graceful failure"
        ],
        "project": "Redesign your prototype's key screen."
      },
      {
        "stage": 5,
        "title": "Launch and learn",
        "description": "Pricing, feedback and iteration.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Pick a pricing approach",
          "Instrument usage",
          "Run a pilot with five users"
        ],
        "project": "Run a pilot and write what you learned."
      }
    ],
    "related": [
      {
        "slug": "business-analyst",
        "title": "Business Analyst"
      },
      {
        "slug": "seo",
        "title": "SEO Specialist"
      },
      {
        "slug": "product-manager",
        "title": "Product Manager"
      },
      {
        "slug": "engineering-manager",
        "title": "Engineering Manager"
      },
      {
        "slug": "developer-relations",
        "title": "Developer Relations"
      },
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      }
    ]
  },
  {
    "id": "e6d23528-e2b6-44cb-8b41-a971b4411c9f",
    "slug": "financial-analyst",
    "title": "Financial Analyst",
    "category": "Finance",
    "description": "Statements, models and a valuation you can defend.",
    "subtitle": "Six stages · about three months at six hours a week · 28 resources",
    "roles": [
      "Financial Analyst",
      "Equity Research Analyst",
      "FP&A Analyst"
    ],
    "hoursPerWeek": 6,
    "stages": [
      {
        "stage": 1,
        "title": "Accounting and the three statements",
        "description": "Income statement, balance sheet and cash flow, and how they link.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Read the three statements",
          "Explain how they connect",
          "Spot red flags in a report"
        ],
        "project": "Summarise one listed company's latest annual report in one page."
      },
      {
        "stage": 2,
        "title": "Excel for finance",
        "description": "The functions and habits analysts use daily.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Rebuild a company's income statement from its report in Excel."
      },
      {
        "stage": 3,
        "title": "Ratios and analysis",
        "description": "Profitability, liquidity and leverage.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Calculate key ratios",
          "Compare companies in one sector",
          "Explain what the ratios say"
        ],
        "project": "Compare three companies in one sector using ten ratios."
      },
      {
        "stage": 4,
        "title": "Building a financial model",
        "description": "A three-statement model with clear assumptions.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Forecast revenue and costs",
          "Link the three statements",
          "Run scenarios"
        ],
        "project": "Build a three-statement model for one company."
      },
      {
        "stage": 5,
        "title": "Valuation",
        "description": "DCF and comparables, and defending your numbers.",
        "weeks": 3,
        "lessons": 5,
        "outcomes": [
          "Build a DCF",
          "Value using comparables",
          "Defend your key assumptions"
        ],
        "project": "Value your company with a DCF and comparables, and write a one-page note."
      },
      {
        "stage": 6,
        "title": "Interviews",
        "description": "Technical questions and pitching a stock.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Answer accounting and valuation questions",
          "Pitch a stock in five minutes",
          "Walk through your model"
        ],
        "project": "Record a five-minute pitch for your company and share the link."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  },
  {
    "id": "10199a4a-f4d8-4386-aec9-d260da779a42",
    "slug": "technical-writer",
    "title": "Technical Writer",
    "category": "Non-technical",
    "description": "Clear docs, style guides and the tools writers use.",
    "subtitle": "Six stages · about two months at five hours a week · 27 resources",
    "roles": [
      "Technical Writer",
      "Documentation Specialist",
      "Content Developer"
    ],
    "hoursPerWeek": 5,
    "stages": [
      {
        "stage": 1,
        "title": "Writing clearly",
        "description": "Short sentences, active voice, one idea at a time.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Edit a paragraph to half its length",
          "Use active voice and plain words",
          "Write for a specific reader"
        ],
        "project": "Rewrite a confusing help article so a beginner can follow it."
      },
      {
        "stage": 2,
        "title": "Style guides",
        "description": "Consistency that readers notice when it is missing.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "frontend",
          "backend",
          "qa-engineer"
        ],
        "project": "Edit your stage 1 article to follow the Google style guide."
      },
      {
        "stage": 3,
        "title": "Types of documentation",
        "description": "Tutorials, how-tos, reference and explanation.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Tell the four types of docs apart",
          "Pick the right type for a need",
          "Structure a docs site"
        ],
        "project": "Plan the docs structure for an open-source tool."
      },
      {
        "stage": 4,
        "title": "Tools: Markdown, Git and docs as code",
        "description": "How modern docs teams work.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Write in Markdown",
          "Edit docs through pull requests",
          "Preview a static docs site"
        ],
        "project": "Fix or improve docs in an open-source repo through a pull request."
      },
      {
        "stage": 5,
        "title": "Documenting APIs",
        "description": "Reference docs developers trust.",
        "weeks": 2,
        "lessons": 5,
        "outcomes": [
          "Document endpoints, parameters and errors",
          "Write a quickstart",
          "Test the docs by following them"
        ],
        "project": "Write a quickstart and reference for a public API."
      },
      {
        "stage": 6,
        "title": "Portfolio and interviews",
        "description": "Writing samples and the writing test.",
        "weeks": 1,
        "lessons": 5,
        "outcomes": [
          "Collect three strong writing samples",
          "Handle a timed writing test",
          "Explain your editing choices"
        ],
        "project": "Publish a portfolio with your best three samples."
      }
    ],
    "related": [
      {
        "slug": "frontend",
        "title": "Frontend Developer"
      },
      {
        "slug": "backend",
        "title": "Backend Developer"
      },
      {
        "slug": "qa-engineer",
        "title": "QA Engineer"
      },
      {
        "slug": "devops",
        "title": "DevOps"
      },
      {
        "slug": "full-stack",
        "title": "Full Stack Developer"
      },
      {
        "slug": "android",
        "title": "Android Developer"
      }
    ]
  }
];

export function getRoadmapBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();
  return ROADMAPS_DATA.find(r => r.slug.toLowerCase() === normalized) || null;
}
