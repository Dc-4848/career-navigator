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

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use(cors());
app.use(express.json());

// Diagnostic request logger (non-production only)
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

// ============================================================================
// DB-READINESS GUARD
// Rejects all database-dependent requests with 503 until MongoDB is connected.
// Passes through /, /health, and OPTIONS (CORS preflight) unconditionally.
// ============================================================================

const DB_FREE_PATHS = new Set(['/', '/health']);

app.use((req, res, next) => {
  if (
    req.method === 'OPTIONS' ||
    DB_FREE_PATHS.has(req.path)
  ) {
    return next();
  }
  const state = mongoose.connection.readyState;
  if (state !== 1) {
    const stateLabel = { 0: 'disconnected', 2: 'connecting', 3: 'disconnecting' }[state] || 'unknown';
    return res.status(503).json({
      message: 'Service temporarily unavailable — database is not ready. Please retry in a few seconds.',
      database: stateLabel,
    });
  }
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

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

// ============================================================================
// STATUS ENDPOINTS (always available, no DB guard)
// ============================================================================

// Root — basic liveness probe used by Render and mobile health check fallback
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Career Navigator API is up and running!',
    timestamp: new Date().toISOString(),
  });
});

// Health — full readiness probe: reports both API liveness and actual DB state
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const dbStatus = dbStatusMap[dbState] || 'unknown';
  const isAtlas =
    mongoose.connection.host && mongoose.connection.host.includes('mongodb.net');

  const httpStatus = dbState === 1 ? 200 : 503;

  res.status(httpStatus).json({
    status: dbState === 1 ? 'online' : 'degraded',
    service: 'career-navigator-backend',
    uptimeSeconds: Math.round(process.uptime()),
    database: dbStatus,
    databaseType: isAtlas
      ? 'MongoDB Atlas'
      : mongoose.connection.host
      ? 'In-Memory/Local'
      : 'none',
    databaseHost: isAtlas
      ? 'MongoDB Atlas Cloud Cluster (*.mongodb.net)'
      : mongoose.connection.host || 'none',
    databaseName: mongoose.connection.name || 'none',
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// 404 & GLOBAL ERROR HANDLERS
// ============================================================================

app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ message: `Endpoint ${req.method} ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err.message || err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
  });
});

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

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
      console.log('MongoDB Atlas connected. Database:', mongoose.connection.name);
    } catch (err) {
      console.error('FATAL: MongoDB Atlas connection error in production:', err.message);
      process.exit(1);
    }
  } else if (explicitlyUseInMemory) {
    try {
      console.log('USE_IN_MEMORY_DB=true — starting local in-memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
      console.log('Connected to in-memory MongoDB (development).');
    } catch (err) {
      console.error('In-memory database startup failed:', err.message);
      process.exit(1);
    }
  } else {
    // Development default: try Atlas, fall back to in-memory if unreachable
    if (!mongoUri) {
      console.error('FATAL: MONGO_URI is missing in backend/.env');
      process.exit(1);
    }
    let connected = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Connecting to MongoDB Atlas (attempt ${attempt}/3)...`);
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
        console.log('MongoDB Atlas connected. Database:', mongoose.connection.name);
        connected = true;
        break;
      } catch (err) {
        console.warn(`Atlas connection attempt ${attempt} failed: ${err.message}`);
        if (attempt < 3) await new Promise(r => setTimeout(r, 2000));
      }
    }

    if (!connected) {
      console.warn('Atlas unreachable after 3 attempts — falling back to in-memory DB for local development.');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
      console.log('Connected to in-memory MongoDB (development fallback).');
    }
  }

  // Seed demonstration users on first run (empty DB only)
  try {
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Empty database detected — seeding demonstration users...');
      await User.create([
        {
          name: 'Elluri Dhanush Chandra',
          email: 'dhanushelluri62@gmail.com',
          password: 'onlydc@123',
          role: 'user',
        },
        {
          name: 'Demo Student',
          email: 'student@careernavigator.com',
          password: 'password123',
          role: 'user',
        },
        {
          name: 'Faculty Demo User',
          email: 'demo@careernavigator.com',
          password: 'password123',
          role: 'user',
        },
      ]);
      console.log('Demonstration users seeded.');
    }
  } catch (seedErr) {
    console.warn('Seed step skipped:', seedErr.message);
  }
};

// ============================================================================
// STARTUP: connect DB first, then bind the HTTP port
// ============================================================================

const PORT = process.env.PORT || 5000;

startServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Server startup failed:', err.message);
    process.exit(1);
  });
