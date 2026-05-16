const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");

const ActivityEvent = sequelize.define("ActivityEvent", {
  event_type: {
    type: DataTypes.ENUM("lesson_started", "lesson_completed", "time_spent"),
    allowNull: false,
  },
  time_spent_minutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = ActivityEvent;