const TasksService = require("../services/TaskService");
const tasksService = new TasksService();
async function editTask(req, res) {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;
    const user = req.user;

    const updatedTask = await tasksService.updateTask(user, taskId, {
      title,
      description,
    });

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}
module.exports = editTask;
