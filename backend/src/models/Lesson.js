const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");

const Lesson = sequelize.define("Lesson", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 30,
  },
  order_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Lesson;