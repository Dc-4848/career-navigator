# Career Navigator 🧭

An AI-powered career guidance web app for college students — helping them discover domains, build skills, generate roadmaps, and find internship and hackathon opportunities.

---

## 📁 Project Structure

```
career-navigator/
├── web/
│   └── frontend/        # React 19 + Vite frontend
├── backend/             # Node.js + Express REST API
├── mobile/
│   └── frontend/        # React Native app (coming soon)
├── .gitignore
└── README.md
```

---

## 🚀 Local Development

### 1. Backend (Express + MongoDB Atlas)

```bash
cd backend
# Create and configure .env (see backend/.env.example for reference)
node server.js
```

- Runs on: **http://localhost:5000**
- Database: MongoDB Atlas (configured via `backend/.env`)

### 2. Frontend (React + Vite)

```bash
cd web/frontend
npm install
npm run dev
```

- Runs on: **http://localhost:5173**
- Communicates with backend at: `http://localhost:5000`

---

## ⚙️ Environment Variables

Create `backend/.env` with the following keys (never commit this file):

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?...
USE_IN_MEMORY_DB=false
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🔐 Authentication

- JWT-based stateless authentication
- Passwords hashed with bcrypt
- Protected routes via middleware

---

## 🧰 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19, Vite, React Router v7   |
| Styling    | Custom CSS, Glassmorphism         |
| State      | React Context API                 |
| HTTP       | Axios (with JWT interceptors)     |
| Backend    | Node.js, Express.js v5            |
| Auth       | JWT, bcrypt.js                    |
| Database   | MongoDB Atlas, Mongoose           |
| Dev DB     | mongodb-memory-server (fallback)  |

---

## 📱 Mobile (Coming Soon)

React Native app will be added under `mobile/frontend/`.
