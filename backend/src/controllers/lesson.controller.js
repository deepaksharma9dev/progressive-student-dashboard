const {
  Lesson,
  Course,
  ActivityEvent,
} = require("../models");

const getLessonsByCourse =
  async (req, res) => {

    try {

      const { courseId } =
        req.params;

      const lessons =
        await Lesson.findAll({
          where: {
            course_id: courseId,
          },

          include: [
            {
              model: Course,
              attributes: [
                "id",
                "title",
              ],
            },
          ],

          order: [
            ["order_no", "ASC"],
          ],
        });

      const result = [];

      for (const lesson of lessons) {

        const completed =
          await ActivityEvent.findOne({
            where: {
              user_id:
                req.user.id,
              lesson_id:
                lesson.id,
              event_type:
                "lesson_completed",
            },
          });

        result.push({
          id: lesson.id,
          title: lesson.title,
          duration:
            lesson.duration_minutes,
          order_no:
            lesson.order_no,
          completed:
            !!completed,
        });
      }

      return res.json({
        status: true,
        data: result,
      });

    } catch (error) {

      return res.status(500).json({
        status: false,
        message:
          "Failed to fetch lessons",
        error: error.message,
      });
    }
  };

module.exports = {
  getLessonsByCourse,
};