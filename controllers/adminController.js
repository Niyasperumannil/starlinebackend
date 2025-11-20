const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// LOGIN
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// REGISTER
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await Admin.findOne({ username });

    if (exists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({ username, password });

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id)
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
