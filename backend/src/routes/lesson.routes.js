// Lesson routes
// Manage lessons and course content

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/lessons', authMiddleware, (req, res) => {
  res.json({ message: 'Get all lessons' });
});

router.get('/lessons/:id', authMiddleware, (req, res) => {
  res.json({ message: `Get lesson ${req.params.id}` });
});

router.post('/lessons/:id/complete', authMiddleware, (req, res) => {
  res.json({ message: `Mark lesson ${req.params.id} as complete` });
});

module.exports = router;
