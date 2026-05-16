// Dashboard routes
// Fetch dashboard data and student progress

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const dashboardController = require('../controllers/dashboard.controller');

router.get('/stats', authMiddleware, dashboardController.getStats);
router.get('/progress', authMiddleware, dashboardController.getProgress);
router.get('/recommendations', authMiddleware, dashboardController.getRecommendations);

module.exports = router;
