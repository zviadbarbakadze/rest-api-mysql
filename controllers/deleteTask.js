const TasksService = require("../services/TaskService");
const tasksService = new TasksService();
async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const user = req.user;

    const deletedTask = await tasksService.deleteTask(user, taskId);

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}
module.exports = deleteTask;
