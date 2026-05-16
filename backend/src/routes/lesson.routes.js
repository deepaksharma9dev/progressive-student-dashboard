const router =
  require("express").Router();

const authMiddleware =
  require("../middleware/auth");

const {
  getLessonsByCourse,
} = require(
  "../controllers/lesson.controller"
);

router.get(
  "/:courseId",
  authMiddleware,
  getLessonsByCourse
);

module.exports = router;