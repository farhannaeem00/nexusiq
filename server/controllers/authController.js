const User = require('../models/User');
const jwt  = require('jsonwebtoken');

// ── Generate JWT ──────────────────────────────────────
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ── Send Token Response ───────────────────────────────
const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id:    user._id,
      name:  user.name,
      email: user.email,
      plan:  user.plan,
    },
  });
};

// ── POST /api/auth/register ───────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    sendTokenResponse(user, 201, res);

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ── POST /api/auth/login ──────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    sendTokenResponse(user, 200, res);

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ── GET /api/auth/me ──────────────────────────────────
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user:    req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { register, login, getMe };