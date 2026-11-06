require('dotenv').config({ path: require('path').join(__dirname, '.env') });
try {
  require('dns').setDefaultResultOrder('ipv4first');
} catch {
  // Ignore on older node engines
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Diagnostic request logger (Development mode)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      const isSlow = duration > 1000 ? ' [SLOW]' : '';
      console.log(`[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)${isSlow}`);
    });
    next();
  });
}

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/profile', require('./routes/profileRoutes'));
app.use('/roadmap', require('./routes/roadmapRoutes'));
app.use('/internships', require('./routes/internshipRoutes'));
app.use('/ai', require('./routes/aiRoutes'));

// CareerCaffe-inspired Feature Routes
app.use('/resources', require('./routes/learningResourceRoutes'));
app.use('/roadmaps', require('./routes/structuredRoadmapRoutes'));
app.use('/opportunities', require('./routes/opportunityRoutes'));
app.use('/recommendations', require('./routes/recommendationRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));


// Root Endpoint (Status check)
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Career Navigator API is up and running!',
    timestamp: new Date()
  });
});

// Lightweight Health Check Endpoint (Used by Mobile app and monitoring)
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const isAtlas = mongoose.connection.host && mongoose.connection.host.includes('mongodb.net');
  res.json({
    status: 'online',
    service: 'career-navigator-backend',
    uptimeSeconds: Math.round(process.uptime()),
    database: dbStatusMap[dbState] || 'unknown',
    databaseType: isAtlas ? 'MongoDB Atlas' : mongoose.connection.host ? 'In-Memory/Local' : 'none',
    databaseHost: isAtlas ? 'MongoDB Atlas Cloud Cluster (*.mongodb.net)' : (mongoose.connection.host || 'none'),
    databaseName: mongoose.connection.name || 'careernavigator',
    timestamp: new Date().toISOString()
  });
});

// Database Connection
const startServer = async () => {
  const mongoUri = process.env.MONGO_URI;
  const isProduction = process.env.NODE_ENV === 'production';
  const explicitlyUseInMemory = process.env.USE_IN_MEMORY_DB === 'true';

  if (isProduction) {
    if (!mongoUri) {
      console.error('FATAL: MONGO_URI is missing in production environment.');
      process.exit(1);
    }
    try {
      console.log('Connecting to MongoDB Atlas (Production)...');
      await mongoose.connect(mongoUri);
      console.log('MongoDB Atlas Connected successfully to database:', mongoose.connection.name);
    } catch (err) {
      console.error('FATAL: MongoDB Atlas Connection Error in production:', err);
      process.exit(1);
    }
  } else if (explicitlyUseInMemory) {
    // Local in-memory fallback ONLY when explicitly enabled via USE_IN_MEMORY_DB=true
    try {
      console.log('USE_IN_MEMORY_DB=true: Initializing Local In-Memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const fallbackUri = mongoServer.getUri();
      await mongoose.connect(fallbackUri);
      console.log('Connected to Local In-Memory MongoDB (Development Mode)');
    } catch (fallbackErr) {
      console.error('In-memory database connection failed:', fallbackErr);
      process.exit(1);
    }
  } else {
    // Default development mode: Connect to actual MongoDB Atlas cluster
    if (!mongoUri) {
      console.error('FATAL: MONGO_URI is missing in backend/.env');
      process.exit(1);
    }
    let connected = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Connecting to MongoDB Atlas (attempt ${attempt}/3)...`);
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
        console.log('MongoDB Atlas Connected successfully to database:', mongoose.connection.name);
        connected = true;
        break;
      } catch (err) {
        console.warn(`MongoDB Atlas connection attempt ${attempt} failed: ${err.message}`);
        if (attempt < 3) {
          await new Promise(r => setTimeout(r, 2000));
        }
      }
    }

    if (!connected) {
      console.warn('Atlas unreachable after 3 attempts. Initializing local in-memory database fallback to preserve dev workflow...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
      console.log('Connected to Local In-Memory MongoDB (Development Mode)');
    }
  }

    // Seed test users if needed
    try {
      const User = require('./models/User');
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('Seeding initial demonstration test users...');
        await User.create([
          {
            name: 'Elluri Dhanush Chandra',
            email: 'dhanushelluri62@gmail.com',
            password: 'onlydc@123',
            role: 'user'
          },
          {
            name: 'Demo Student',
            email: 'student@careernavigator.com',
            password: 'password123',
            role: 'user'
          },
          {
            name: 'Faculty Demo User',
            email: 'demo@careernavigator.com',
            password: 'password123',
            role: 'user'
          }
        ]);
        console.log('Demonstration test users seeded successfully!');
      }
    } catch (seedErr) {
      // Ignore seed error
    }
};

startServer();

// 404 Handler
app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ message: `Endpoint ${req.method} ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err.message || err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { error: err.message })
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

