const bcrypt = require("bcryptjs");

const {
  sequelize,
  User,
  Course,
  Lesson,
  ActivityEvent,
} = require("../models");

const daysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

async function seed() {
  try {
    await sequelize.sync({ force: true });

    console.log("Database reset completed");

    const password_hash = await bcrypt.hash("password123", 10);

    const student1 = await User.create({
      name: "Deepak Sharma",
      email: "deepak@example.com",
      password_hash,
      role: "student",
    });

    const student2 = await User.create({
      name: "John Student",
      email: "student@example.com",
      password_hash,
      role: "student",
    });

    const student3 = await User.create({
      name: "Priya Verma",
      email: "priya@example.com",
      password_hash,
      role: "student",
    });

    await User.create({
      name: "Sarah Mentor",
      email: "mentor@example.com",
      password_hash,
      role: "mentor",
    });

    const coursesData = [
      {
        title: "React Basics",
        description: "Learn React fundamentals",
        lessons: 8,
        duration: 30,
      },
      {
        title: "Node.js API Development",
        description: "Build scalable REST APIs",
        lessons: 7,
        duration: 40,
      },
      {
        title: "PostgreSQL Fundamentals",
        description: "Database design and SQL queries",
        lessons: 6,
        duration: 35,
      },
      {
        title: "Frontend UI Design",
        description: "Responsive layout and dashboard UI",
        lessons: 5,
        duration: 25,
      },
    ];

    const courses = [];
    const allLessons = [];

    for (const courseData of coursesData) {
      const course = await Course.create({
        title: courseData.title,
        description: courseData.description,
      });

      courses.push(course);

      for (let i = 1; i <= courseData.lessons; i++) {
        const lesson = await Lesson.create({
          course_id: course.id,
          title: `${courseData.title} - Lesson ${i}`,
          duration_minutes: courseData.duration + i * 2,
          order_no: i,
        });

        allLessons.push(lesson);
      }
    }

    const createStudentProgress = async (student, config) => {
      let dayCounter = 21;

      for (const item of config) {
        const course = courses[item.courseIndex];

        const lessons = await Lesson.findAll({
          where: {
            course_id: course.id,
          },
          order: [["order_no", "ASC"]],
        });

        for (let i = 0; i < item.completed; i++) {
          const lesson = lessons[i];

          await ActivityEvent.create({
            user_id: student.id,
            course_id: course.id,
            lesson_id: lesson.id,
            event_type: "lesson_started",
            time_spent_minutes: 5,
            createdAt: daysAgo(dayCounter),
            updatedAt: daysAgo(dayCounter),
          });

          await ActivityEvent.create({
            user_id: student.id,
            course_id: course.id,
            lesson_id: lesson.id,
            event_type: "time_spent",
            time_spent_minutes: 20 + i * 4,
            createdAt: daysAgo(dayCounter - 1),
            updatedAt: daysAgo(dayCounter - 1),
          });

          await ActivityEvent.create({
            user_id: student.id,
            course_id: course.id,
            lesson_id: lesson.id,
            event_type: "lesson_completed",
            time_spent_minutes: lesson.duration_minutes,
            createdAt: daysAgo(dayCounter - 2),
            updatedAt: daysAgo(dayCounter - 2),
          });

          dayCounter -= 2;

          if (dayCounter < 1) {
            dayCounter = 1;
          }
        }
      }
    };

    await createStudentProgress(student1, [
      { courseIndex: 0, completed: 6 },
      { courseIndex: 1, completed: 4 },
      { courseIndex: 2, completed: 3 },
      { courseIndex: 3, completed: 5 },
    ]);

    await createStudentProgress(student2, [
      { courseIndex: 0, completed: 8 },
      { courseIndex: 1, completed: 5 },
      { courseIndex: 2, completed: 2 },
      { courseIndex: 3, completed: 4 },
    ]);

    await createStudentProgress(student3, [
      { courseIndex: 0, completed: 3 },
      { courseIndex: 1, completed: 6 },
      { courseIndex: 2, completed: 5 },
      { courseIndex: 3, completed: 2 },
    ]);

    console.log("Seed completed successfully");

    console.log(`
Demo Logins:

Student 1:
deepak@example.com
password123

Student 2:
student@example.com
password123

Student 3:
priya@example.com
password123

Mentor:
mentor@example.com
password123
`);

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();