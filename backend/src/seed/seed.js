const bcrypt = require("bcryptjs");

const {
  sequelize,
  User,
  Course,
  Lesson,
  ActivityEvent,
} = require("../models");

async function seed() {
  try {

    await sequelize.sync({
      force: true,
    });

    console.log("Database reset completed");

    /**
     * USERS
     */

    const password_hash =
      await bcrypt.hash(
        "password123",
        10
      );

    const student =
      await User.create({
        name: "John Student",
        email:
          "student@example.com",
        password_hash,
        role: "student",
      });

    const mentor =
      await User.create({
        name: "Sarah Mentor",
        email:
          "mentor@example.com",
        password_hash,
        role: "mentor",
      });

    /**
     * COURSES
     */

    const reactCourse =
      await Course.create({
        title: "React Basics",
        description:
          "Learn React fundamentals",
      });

    const nodeCourse =
      await Course.create({
        title: "Node.js API Development",
        description:
          "Build backend APIs",
      });

    /**
     * LESSONS
     */

    const lessons = [];

    for (
      let i = 1;
      i <= 5;
      i++
    ) {

      const lesson =
        await Lesson.create({
          course_id:
            reactCourse.id,
          title:
            `React Lesson ${i}`,
          duration_minutes: 30,
          order_no: i,
        });

      lessons.push(lesson);
    }

    for (
      let i = 1;
      i <= 5;
      i++
    ) {

      const lesson =
        await Lesson.create({
          course_id:
            nodeCourse.id,
          title:
            `Node Lesson ${i}`,
          duration_minutes: 40,
          order_no: i,
        });

      lessons.push(lesson);
    }

    /**
     * ACTIVITY EVENTS
     */

    for (
      let i = 0;
      i < 7;
      i++
    ) {

      const lesson =
        lessons[i];

      await ActivityEvent.create({
        user_id: student.id,
        course_id:
          lesson.course_id,
        lesson_id: lesson.id,
        event_type:
          "lesson_completed",
        time_spent_minutes:
          25 + i * 5,
        createdAt: new Date(
          Date.now() -
            i *
              24 *
              60 *
              60 *
              1000
        ),
      });
    }

    console.log(
      "Seed completed successfully"
    );

    console.log(`
Student Login:
student@example.com
password123

Mentor Login:
mentor@example.com
password123
`);

    process.exit(0);

  } catch (error) {

    console.error(
      "Seed failed:",
      error
    );

    process.exit(1);
  }
}

seed();