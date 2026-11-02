# Career Navigator 🧭

An AI-powered, cross-platform career guidance and acceleration system for college students and early-career engineers. Career Navigator helps students discover high-demand tech domains, assess skill gaps, generate customized 12-week learning roadmaps, analyze resumes with ATS scoring, and track curated internships and hackathons.

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
2. **Synchronized State**: Any profile changes, saved roadmaps, or internships created on one platform immediately reflect on the other.
3. **Zero Direct DB Access**: Mobile clients never connect directly to MongoDB; all queries go through the Express REST API.
4. **Resilient LAN Networking**: Mobile client dynamically resolves the packager host address via `Constants.expoConfig.hostUri` with LAN IP fallback, enabling seamless Expo Go operation on physical Android and iOS devices.

---

## 📁 Repository Structure

```
career-navigator/
├── web/
│   └── frontend/          # React 19 + Vite web client
├── backend/               # Node.js + Express REST API
│   ├── tests/             # Automated test runners & report generators
│   └── .env.example       # Backend environment configuration template
├── mobile/
│   └── frontend/          # React Native + Expo SDK 57 mobile client
├── .gitignore             # Git exclusion rules (node_modules, .env, builds)
├── README.md              # Project documentation
├── Career_Navigator_Complete_Test_Report.xlsx # 13-sheet comprehensive QA report
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
| **Local AI Layer** | Ollama, Qwen3-8B, BGE-M3 | 12-week roadmap generator, semantic skill gap embedding, ATS resume analyzer |
| **Quality Assurance**| Selenium, Appium specs, Node Test Suite | 580+ test cases covering API, Web, Mobile, Security, and Load benchmarks |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas**: Active cluster with database `careernavigator`
- **Expo Go** (optional, for physical phone testing): Available on Google Play Store and Apple App Store

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
   npx expo start --clear
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
From the `backend/tests` directory:
```bash
# Execute end-to-end cross-platform shared data test
node test-shared-data.js

# Generate 580+ test case master report (Career_Navigator_Complete_Test_Report.xlsx)
node generateMasterReport.js

# Generate test matrix workbook (Career_Navigator_Test_Report.xlsx)
node generateTestReport.js
```

### Test Coverage Highlights:
- **API & Authentication**: Verified user signup, bcrypt hashing, stateless JWT session retrieval, unauthorized request rejection.
- **Cross-Platform Sync**: Verified user created on Web can log in from Mobile LAN; profile updates on Mobile immediately reflect on Web; roadmaps and internships created on one platform appear on the other.
- **Security Audit**: Tested resilience against NoSQL injection payloads (`{$gt: ""}`), malformed JWT rejection, and verified that `.env` credentials are excluded from source control.
- **Performance Benchmarks**: Root API endpoints sustain concurrent load with sub-100ms average response times.

---

## 🔒 Security Best Practices

- **Zero Secrets Committed**: `.env` files are strictly excluded via `.gitignore`.
- **Stateless Tokens**: JWTs expire and are validated per protected request.
- **Input Sanitization**: Express and Mongoose schemas sanitize and type-cast incoming payloads.
- **No In-Memory Fallback in Production**: Live Atlas connection is mandatory in production mode.

---

## 📄 License

This project is licensed under the MIT License.
