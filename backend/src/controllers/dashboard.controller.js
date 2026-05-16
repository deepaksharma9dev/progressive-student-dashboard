const {
  Course,
  Lesson,
  ActivityEvent,
  sequelize,
  User
} = require("../models");

const {
  fn,
  col,
  literal,
} = require("sequelize");

const getSummary =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const completedLessons =
        await ActivityEvent.count({
          where: {
            user_id: userId,
            event_type:
              "lesson_completed",
          },
        });

      const totalTime =
        await ActivityEvent.sum(
          "time_spent_minutes",
          {
            where: {
              user_id: userId,
            },
          }
        );

      const totalLessons =
        await Lesson.count();

      const progress =
        totalLessons === 0
          ? 0
          : Math.round(
              (
                completedLessons /
                totalLessons
              ) *
                100
            );

      return res.json({
        status: true,
        data: {
          completedLessons,
          totalLessons,
          totalTimeSpent:
            totalTime || 0,
          progress,
        },
      });

    } catch (error) {

      return res.status(500).json({
        status: false,
        message:
          "Failed to fetch summary",
        error: error.message,
      });
    }
  };

const getTimeSeries =
  async (req, res) => {

    try {

      const data =
        await ActivityEvent.findAll({
          where: {
            user_id:
              req.user.id,
          },

          attributes: [
            [
              fn(
                "DATE",
                col("createdAt")
              ),
              "date",
            ],

            [
              fn(
                "SUM",
                col(
                  "time_spent_minutes"
                )
              ),
              "minutes",
            ],
          ],

          group: [
            literal(
              'DATE("createdAt")'
            ),
          ],

          order: [
            [
              literal(
                'DATE("createdAt")'
              ),
              "ASC",
            ],
          ],
        });

      return res.json({
        status: true,
        data,
      });

    } catch (error) {

      return res.status(500).json({
        status: false,
        message:
          "Failed to fetch trend data",
        error: error.message,
      });
    }
  };

const getCourseProgress =
  async (req, res) => {

    try {

      const courses =
        await Course.findAll({
          include: [
            {
              model: Lesson,
            },
          ],
        });

      const result = [];

      for (const course of courses) {

        const totalLessons =
          course.Lessons.length;

        const completed =
          await ActivityEvent.count({
            where: {
              user_id:
                req.user.id,
              course_id:
                course.id,
              event_type:
                "lesson_completed",
            },
          });

        result.push({
          courseId: course.id,
          courseTitle:
            course.title,
          completedLessons:
            completed,
          totalLessons,
          progress:
            totalLessons === 0
              ? 0
              : Math.round(
                  (
                    completed /
                    totalLessons
                  ) *
                    100
                ),
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
          "Failed to fetch course progress",
        error: error.message,
      });
    }
  };

const getCompletionDistribution =
  async (req, res) => {

    try {

      const totalLessons =
        await Lesson.count();

      const completedLessons =
        await ActivityEvent.count({
          where: {
            user_id:
              req.user.id,
            event_type:
              "lesson_completed",
          },
        });

      const pendingLessons =
        totalLessons -
        completedLessons;

      return res.json({
        status: true,
        data: [
          {
            name: "Completed",
            value:
              completedLessons,
          },
          {
            name: "Pending",
            value:
              pendingLessons,
          },
        ],
      });

    } catch (error) {

      return res.status(500).json({
        status: false,
        message:
          "Failed to fetch completion distribution",
        error: error.message,
      });
    }
  };

const getRecommendations =
  async (req, res) => {

    try {

      const courses =
        await Course.findAll({
          include: [
            {
              model: Lesson,
            },
          ],
        });

      let weakestCourse =
        null;

      let lowestProgress =
        100;

      for (const course of courses) {

        const totalLessons =
          course.Lessons.length;

        const completed =
          await ActivityEvent.count({
            where: {
              user_id:
                req.user.id,
              course_id:
                course.id,
              event_type:
                "lesson_completed",
            },
          });

        const progress =
          totalLessons === 0
            ? 0
            : Math.round(
                (
                  completed /
                  totalLessons
                ) *
                  100
              );

        if (
          progress <
          lowestProgress
        ) {

          lowestProgress =
            progress;

          weakestCourse =
            course;
        }
      }

      return res.json({
        status: true,
        data: {
          recommendation:
            weakestCourse
              ? `Continue learning ${weakestCourse.title}`
              : "You are doing great",
        },
      });

    } catch (error) {

      return res.status(500).json({
        status: false,
        message:
          "Failed to fetch recommendations",
        error: error.message,
      });
    }
  };

const { Parser } =
  require("json2csv");

const exportProgressCsv =
  async (req, res) => {

    try {

      const courses =
        await Course.findAll({
          include: [
            {
              model: Lesson,
            },
          ],
        });

      const result = [];

      for (const course of courses) {

        const totalLessons =
          course.Lessons.length;

        const completed =
          await ActivityEvent.count({
            where: {
              user_id:
                req.user.id,
              course_id:
                course.id,
              event_type:
                "lesson_completed",
            },
          });

        result.push({
          course:
            course.title,
          completedLessons:
            completed,
          totalLessons,
          progress:
            totalLessons === 0
              ? 0
              : Math.round(
                  (
                    completed /
                    totalLessons
                  ) *
                    100
                ),
        });
      }

      const parser =
        new Parser();

      const csv =
        parser.parse(result);

      res.header(
        "Content-Type",
        "text/csv"
      );

      res.attachment(
        "student-progress.csv"
      );

      return res.send(csv);

    } catch (error) {

      return res.status(500).json({
        status: false,
        message:
          "CSV export failed",
        error: error.message,
      });
    }
  };

const getMentorDashboard =
  async (req, res) => {

    try {

      if (
        req.user.role !==
        "mentor"
      ) {

        return res
          .status(403)
          .json({
            status: false,
            message:
              "Only mentors allowed",
          });
      }

      const students =
        await User.findAll({
          where: {
            role: "student",
          },
        });

      const result = [];

      for (const student of students) {

        const completedLessons =
          await ActivityEvent.count({
            where: {
              user_id:
                student.id,
              event_type:
                "lesson_completed",
            },
          });

        const totalTime =
          await ActivityEvent.sum(
            "time_spent_minutes",
            {
              where: {
                user_id:
                  student.id,
              },
            }
          );

        result.push({
          student:
            student.name,
          completedLessons,
          totalTimeSpent:
            totalTime || 0,
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
          "Failed to fetch mentor dashboard",
        error: error.message,
      });
    }
  };


module.exports = {
  getSummary,
  getTimeSeries,
  getCourseProgress,
  getCompletionDistribution,
  getRecommendations,
  exportProgressCsv,
  getMentorDashboard,    
};