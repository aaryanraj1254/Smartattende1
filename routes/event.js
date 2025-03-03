const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

router.post('/create', protect, checkRole(['organizer', 'admin']), createEvent);
router.get('/', protect, getEvents);

module.exports = router;
