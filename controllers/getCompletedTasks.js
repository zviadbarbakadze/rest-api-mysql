const TasksService = require("../services/TaskService");
const tasksService = new TasksService();
async function getCompletedTasks(req, res) {
  try {
    const user = req.user;

    const completedTasks = await tasksService.getCompletedTasks(user);

    if (completedTasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No completed tasks found for the user" });
    }

    res.json({
      message: "Completed tasks retrieved successfully",
      tasks: completedTasks,
    });
  } catch (error) {
    console.log(error.mesage);
    res.status(400).json({ error: error.message });
  }
}
module.exports = getCompletedTasks;
