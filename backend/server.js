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
app.use('/ai', require('./routes/aiRoutes'));


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
    try {
      console.log('Connecting to MongoDB Atlas (careernavigator)...');
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
      console.log('MongoDB Atlas Connected successfully to database:', mongoose.connection.name);
    } catch (err) {
      console.error('MongoDB Atlas Connection Error:', err.message);
      console.error('Automatic in-memory fallback is disabled. Set USE_IN_MEMORY_DB=true in .env to use in-memory database.');
      throw err;
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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

