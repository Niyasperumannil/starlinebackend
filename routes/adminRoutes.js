const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

// Protected route – admin profile
router.get('/profile', protect, (req, res) => {
  res.json({
    _id: req.admin._id,
    username: req.admin.username
  });
});

module.exports = router;
