// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');
const ROLES = require('../utils/roles');


router.post('/signup', signup);


router.post('/login', login);


router.get('/admin/dashboard', authenticateToken, authorize([ROLES.ADMIN]), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

router.get('/user/profile', authenticateToken, authorize([ROLES.USER]), (req, res) => {
  res.json({ message: 'Welcome to your profile' });
});

// Assign roles (Admin only)
router.put('/assign-role', authenticateToken, authorize([ROLES.ADMIN]), async (req, res) => {
  const { userId, role } = req.body;
  
  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error });
  }
});

module.exports = router;
