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
  try {
    let mongoUri = process.env.MONGO_URI;
    // Determine if we should use In-Memory MongoDB
    const useInMemory = process.env.USE_IN_MEMORY_DB !== 'false' && (!mongoUri || mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1'));

    if (useInMemory) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('Using In-Memory MongoDB (No installation required!)');
      console.log(`In-Memory MongoDB Connection URI: ${mongoUri}`);
    } else {
      console.log(`Connecting to external MongoDB: ${mongoUri}`);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');

    // Seed test users if database is empty
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Seeding initial test users...');
      await User.create([
        {
          name: 'Test User',
          email: 'test@careernavigator.com',
          password: 'test123',
          role: 'user'
        },
        {
          name: 'Admin User',
          email: 'admin@careernavigator.com',
          password: 'admin123',
          role: 'admin'
        }
      ]);
      console.log('Test users seeded successfully!');
    }
  } catch (err) {
    console.log('MongoDB Connection Error: ', err);
  }
};

startServer();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
