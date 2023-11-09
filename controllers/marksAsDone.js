const TasksService = require("../services/TaskService");
const tasksService = new TasksService();
async function markAsDone(req, res) {
  try {
    const { taskId } = req.params;
    const user = req.user;

    const task = await tasksService.markTaskAsDone(user, taskId);

    res.json({ message: "Task marked as done", task });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}
module.exports = markAsDone;
