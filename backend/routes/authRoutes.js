const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ message: 'User already exists. Try signing in instead.' });
    }

    // Auto-grant admin role for specific email
    const role = normalizedEmail === 'admin@careernavigator.com' ? 'admin' : 'user';

    user = new User({ name: name.trim(), email: normalizedEmail, password, role });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Unable to create your account. Please try again.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Unable to log in. Please try again.' });
  }
});

// Get current authenticated user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    console.error('Get Me Error:', error);
    res.status(500).json({ message: 'Unable to fetch user details. Please try again.' });
  }
});

// Debug route to view users (dev only, passwords excluded)
if (process.env.NODE_ENV !== 'production') {
  router.get('/debug/users', async (req, res) => {
    try {
      const users = await User.find({}).select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
}

module.exports = router;

