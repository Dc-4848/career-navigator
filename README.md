# Career Navigator 🧭

An AI-powered, cross-platform career guidance and acceleration system for college students and early-career engineers. Career Navigator helps students discover high-demand tech domains, assess skill gaps, follow structured step-by-step learning roadmaps, curate learning resources, track job & internship applications through an end-to-end pipeline, and analyze resumes with ATS scoring.

---

## 🏛️ Architecture Overview

The system operates on a unified, single-backend architecture: Web and Mobile clients communicate with the exact same Express REST API and share a single MongoDB Atlas database (`careernavigator`).

```
                    ┌──────────────────────────┐
                    │      WEB FRONTEND        │
                    │   React 19.2.5 + Vite    │
                    │  (http://localhost:5173) │
                    └────────────┬─────────────┘
                                 │
                                 │ HTTP / JSON (Axios)
                                 ▼
┌──────────────────────────┐     │     ┌──────────────────────────┐
│     MOBILE FRONTEND      │     │     │    LOCAL AI SERVICES     │
│ React Native 0.86 + Expo ├─────┼────►│  Qwen3-8B / BGE-M3 Embed  │
│ (http://<LAN_IP>:8081)   │     │     │   (Ollama / HTTP Layer)  │
└────────────┬─────────────┘     │     └──────────────────────────┘
             │                   │
             └───────────┐       │
         HTTP / LAN REST │       │
                         ▼       ▼
              ┌─────────────────────────────┐
              │    UNIFIED BACKEND API      │
              │   Node.js + Express 5.2.1   │
              │    Port 5000 (LAN / Local)  │
              └──────────────┬──────────────┘
                             │
                             │ Mongoose 9.6
                             ▼
              ┌─────────────────────────────┐
              │     MONGODB ATLAS CLOUD     │
              │  Database: careernavigator  │
              └─────────────────────────────┘
```

### Key Architectural Principles:
1. **Single Source of Truth**: Web and mobile authenticate against the exact same MongoDB Atlas user collection.
2. **Synchronized State**: Any profile changes, saved roadmaps, bookmarks, or job applications created on one platform immediately reflect on the other.
3. **Zero Direct DB Access**: Mobile clients never connect directly to MongoDB; all queries go through the Express REST API.
4. **Resilient LAN & Production Networking**: Mobile client dynamically prioritizes `EXPO_PUBLIC_API_URL`, falls back to production `https://career-navigator-2cwd.onrender.com` in production, or resolves the host address via `Constants.expoConfig.hostUri` on local Wi-Fi.

---

## ✨ Core & Expanded Capabilities

### 1. 🗺️ 12+ Structured Learning Roadmaps
- **Catalog of Industry Tracks**: Full Stack Web Development, Frontend (React/Next.js), Backend (Node/Express/Microservices), Data Analytics, Machine Learning & AI, Cybersecurity & Ethical Hacking, Cloud & DevOps (AWS/Docker/K8s), Android & Mobile (React Native/Expo), Data Structures & Algorithms, Python, Java, and UI/UX Design.
- **Milestone-by-Milestone Progress**: Multi-stage learning paths with practical assignments, mini-projects, capstone project blueprints, topic checkboxes, and real-time completion percentages saved to Atlas.
- **AI Custom Roadmap Synthesis**: Custom tailored curriculum generation for any niche degree, background, or time commitment.

### 2. 📚 Curated Learning Resource Library
- **Verified High-Yield Material**: Curated official documentation (MDN, Scikit-learn, Docker, PyTorch, React, etc.), top video guides, interactive sandboxes, and full-length courses.
- **Smart Filtering**: Filter by resource type (Docs, Video, Interactive, Course), tech stack, difficulty, and 100% free resources.
- **Cross-Platform Bookmarking**: Personal bookmark collection synchronized seamlessly across Web and Mobile.

### 3. 💼 Opportunity Discovery & Application Tracker
- **Smart Search & Filters**: Live internships, fresher jobs, entry-level developer roles, and off-campus listings filtered by workplace (Remote, Hybrid, Onsite) and job type.
- **Kanban Application Pipeline**: Track application lifecycles through 6 distinct stages: `Saved` → `Applied` → `Assessment` → `Interview` → `Offered` / `Rejected`.
- **Notes & Deadlines**: Log interview dates, company contact notes, stipend/salary packages, and follow-up deadlines directly in Atlas.

### 4. 📊 Unified Student Dashboard & Personalized Recommendations
- **Real-Time Analytics**: Profile completion gauge, active roadmap progression %, total tracked applications, and saved resource count.
- **Recommendation Engine**: Algorithmic match scoring that analyzes student profile skills, target goals, and active domain to explain *why* specific roadmaps, resources, and jobs are recommended.

### 5. 📄 ATS Resume Analyzer & Skill Gap Engine
- **ATS Scoring**: Analyzes raw resume text and keyword density against high-demand tech job specifications.
- **Semantic Vector Match**: Evaluates user skill gap using semantic similarity calculations to pinpoint missing proficiencies.

---

## 📁 Repository Structure

```
career-navigator/
├── web/
│   └── frontend/          # React 19 + Vite web client
│       └── src/
│           ├── components/ # Navbar, ProtectedRoute, UI components
│           ├── pages/      # Landing, Profile, Roadmap, Resources, Internships, etc.
│           └── api/        # Axios API client configured for unified backend
├── backend/               # Node.js + Express REST API
│   ├── config/            # AI configuration
│   ├── data/              # Curated roadmaps, resources, and opportunities datasets
│   ├── middleware/        # JWT Authentication and authorization middleware
│   ├── models/            # Mongoose schemas (User, Profile, LearningResource, etc.)
│   ├── routes/            # REST API endpoints
│   ├── tests/             # Automated test runners & report generators
│   └── .env.example       # Backend environment configuration template
├── mobile/
│   └── frontend/          # React Native + Expo SDK 57 mobile client
│       └── src/
│           ├── api/       # Dynamic packager/LAN/production API client
│           ├── context/   # MobileAppContext (shared auth, roadmap & tracker state)
│           └── screens/   # Home, Roadmap, Resources, Jobs, Profile, etc.
├── .gitignore             # Git exclusion rules (node_modules, .env, builds)
├── README.md              # Project documentation
├── Career_Navigator_Complete_Test_Report.xlsx # 590+ test case master report
└── Career_Navigator_Test_Report.xlsx          # Detailed test case matrix
```

---

## 🧰 Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Web Frontend** | React 19.2.5, Vite 8.0.10 | Glassmorphic UI, Canvas particle backgrounds, Lucide icons, React Router |
| **Mobile Frontend**| React Native 0.86.3, Expo SDK 57.0.31 | Cross-platform (Android & iOS), Expo Vector Icons, Dynamic LAN networking |
| **Backend API** | Node.js, Express 5.2.1 | RESTful architecture, Stateless JWT sessions, bcryptjs password hashing |
| **Database** | MongoDB Atlas (`careernavigator`) | Managed cloud cluster, Mongoose ODM schemas with strict validation |
| **AI Layer** | Ollama, Qwen3-8B, BGE-M3 | 12-week roadmap generator, semantic skill gap embedding, ATS resume analyzer |
| **Quality Assurance**| Selenium, Appium specs, Node Test Suite | 590+ test cases covering API, Web, Mobile, Security, and Load benchmarks |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas**: Active cluster with database `careernavigator`
- **Expo Go** (for physical phone testing): Available on Google Play Store and Apple App Store

---

### 1. Unified Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB Atlas connection URI and secret:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/careernavigator?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   *The server runs on `http://localhost:5000` (and on your local Wi-Fi LAN IP at `http://<YOUR_LAN_IP>:5000`).*

---

### 2. Web Frontend Setup

1. In a new terminal, navigate to the web frontend directory:
   ```bash
   cd web/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 3. Mobile Frontend Setup (React Native + Expo Go)

1. In a new terminal, navigate to the mobile frontend directory:
   ```bash
   cd mobile/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo Metro bundler:
   ```bash
   npx expo start --clear --lan
   ```
4. **Connect your physical Android/iOS phone:**
   - Ensure your phone is connected to the **same Wi-Fi network** as your development laptop.
   - Open the **Expo Go** app on your phone.
   - Scan the QR code displayed in the terminal (or enter `exp://<YOUR_LAN_IP>:8081`).
   - The app bundles and launches with full cross-platform backend connectivity.

---

## 🧪 Testing & Quality Assurance

The application includes an extensive automated QA test suite and master Excel reporting infrastructure.

### Running Live Tests & Generating Reports
From the `backend` directory:
```bash
# Execute end-to-end integration verification (19/19 passing)
node ../.gemini/antigravity/brain/<CONVERSATION_ID>/scratch/test_all_endpoints.js

# Generate 590+ test case master report (Career_Navigator_Complete_Test_Report.xlsx)
node tests/generateMasterReport.js

# Generate test matrix workbook (Career_Navigator_Test_Report.xlsx)
node tests/generateTestReport.js
```

### Test Coverage Highlights:
- **API & Authentication**: Verified user signup, bcrypt hashing, stateless JWT session retrieval, unauthorized request rejection.
- **Cross-Platform Sync**: Verified user created on Web can log in from Mobile LAN; profile updates on Mobile immediately reflect on Web; roadmaps and applications created on one platform appear on the other.
- **Career Roadmaps & Resources**: Verified 12+ structured tracks, interactive topic/stage toggles, and resource search/bookmarking.
- **Application Pipeline**: Verified CRUD application tracking and status progression.
- **Security Audit**: Tested resilience against NoSQL injection payloads (`{$gt: ""}`), malformed JWT rejection, and verified that `.env` credentials are excluded from source control.
- **Performance Benchmarks**: Root API endpoints sustain concurrent load with sub-50ms average response times.

---

## 🔒 Security Best Practices

- **Zero Secrets Committed**: `.env` files are strictly excluded via `.gitignore`.
- **Stateless Tokens**: JWTs expire and are validated per protected request.
- **Input Sanitization**: Express and Mongoose schemas sanitize and type-cast incoming payloads.
- **No In-Memory Fallback in Production**: Live Atlas connection is mandatory in production mode.

---

## 📄 License

This project is licensed under the MIT License.
