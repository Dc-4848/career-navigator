require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/profile', require('./routes/profileRoutes'));
app.use('/roadmap', require('./routes/roadmapRoutes'));
app.use('/internships', require('./routes/internshipRoutes'));

// Root Endpoint (Status check)
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Career Navigator API is up and running!',
    timestamp: new Date()
  });
});

// Database Connection
const startServer = async () => {
  const mongoUri = process.env.MONGO_URI;
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    if (!mongoUri) {
      console.error('FATAL: MONGO_URI is missing in production environment.');
      process.exit(1);
    }
    try {
      console.log('Connecting to MongoDB Atlas (Production)...');
      await mongoose.connect(mongoUri);
      console.log('MongoDB Atlas Connected successfully');
    } catch (err) {
      console.error('FATAL: MongoDB Atlas Connection Error in production:', err);
      process.exit(1);
    }
  } else {
    // Development mode
    let connected = false;
    if (mongoUri) {
      try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 });
        console.log('MongoDB Atlas Connected successfully');
        connected = true;
      } catch (err) {
        console.warn('MongoDB Atlas connection failed (' + err.message + ').');
        console.warn('Falling back to in-memory database for local demonstration...');
      }
    }

    if (!connected) {
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        const fallbackUri = mongoServer.getUri();
        await mongoose.connect(fallbackUri);
        console.log('Connected to Local In-Memory MongoDB (Development & Demo Mode)');
      } catch (fallbackErr) {
        console.error('Database connection failed:', fallbackErr);
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
  }
};

startServer();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

