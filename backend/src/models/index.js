const {
  sequelize,
} = require("../config/db");

const User = require("./User");
const Course = require("./Course");
const Lesson = require("./Lesson");
const ActivityEvent = require("./ActivityEvent");

/**
 * Associations
 */

Course.hasMany(Lesson, {
  foreignKey: "course_id",
  onDelete: "CASCADE",
});

Lesson.belongsTo(Course, {
  foreignKey: "course_id",
});

User.hasMany(ActivityEvent, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

ActivityEvent.belongsTo(User, {
  foreignKey: "user_id",
});

Course.hasMany(ActivityEvent, {
  foreignKey: "course_id",
  onDelete: "CASCADE",
});

ActivityEvent.belongsTo(Course, {
  foreignKey: "course_id",
});

Lesson.hasMany(ActivityEvent, {
  foreignKey: "lesson_id",
  onDelete: "CASCADE",
});

ActivityEvent.belongsTo(Lesson, {
  foreignKey: "lesson_id",
});

module.exports = {
  sequelize,
  User,
  Course,
  Lesson,
  ActivityEvent,
};