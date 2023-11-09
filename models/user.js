const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,

    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
});
User.hasMany(Task);
Task.belongsTo(User, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});

module.exports = {
  User,
  Task,
};
