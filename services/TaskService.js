const { Task } = require("../models/user");

class TasksService {
  async addTask(user, { title, description }) {
    try {
      const taskExists = await Task.findOne({ where: { title } });
      if (taskExists) {
        throw new Error("Title already exists");
      }
      if (!title || !description) {
        throw new Error("All fields are required");
      }

      const newTask = await Task.create({
        title,
        description,
        done: false,
        UserId: user.id,
      });

      return newTask;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add task");
    }
  }

  async deleteTask(user, taskId) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, UserId: user.id },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      await task.destroy();
      return task;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete task");
    }
  }

  async markTaskAsDone(user, taskId) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, UserId: user.id },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      task.done = true;
      await task.save();
      return task;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to mark task as done");
    }
  }

  async updateTask(user, taskId, { title, description }) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, UserId: user.id },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      task.title = title;
      task.description = description;
      await task.save();
      return task;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update task");
    }
  }

  async getAllTasks(user) {
    try {
      const tasks = await Task.findAll({
        where: { UserId: user.id, done: false },
      });

      return tasks;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get tasks");
    }
  }

  async getCompletedTasks(user) {
    try {
      const completedTasks = await Task.findAll({
        where: { UserId: user.id, done: true },
      });

      return completedTasks;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get completed tasks");
    }
  }
}

module.exports = TasksService;
