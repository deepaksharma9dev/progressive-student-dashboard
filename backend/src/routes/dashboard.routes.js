const router =
  require("express").Router();

const authMiddleware =
  require("../middleware/auth");

const {
  getSummary,
  getTimeSeries,
  getCourseProgress,
  getCompletionDistribution,
  getRecommendations,
  exportProgressCsv,
  getMentorDashboard
} = require(
  "../controllers/dashboard.controller"
);

router.get(
  "/summary",
  authMiddleware,
  getSummary
);

router.get(
  "/time-series",
  authMiddleware,
  getTimeSeries
);

router.get(
  "/course-progress",
  authMiddleware,
  getCourseProgress
);

router.get(
  "/completion-distribution",
  authMiddleware,
  getCompletionDistribution
);

router.get(
  "/recommendations",
  authMiddleware,
  getRecommendations
);

router.get(
  "/mentor",
  authMiddleware,
  getMentorDashboard
);

module.exports = router;