const TasksService = require("../services/TaskService");
const tasksService = new TasksService();
async function getUncompletedTasks(req, res) {
  const user = req.user;

  if (!user || user.Tasks.length === 0) {
    return res.status(404).json({ message: "No tasks found for the user" });
  }

  try {
    const todoTasks = await tasksService.getAllTasks(user);

    if (todoTasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for the user" });
    }

    res
      .status(200)
      .json({ message: "Tasks retrieved successfully", tasks: todoTasks });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}
module.exports = getUncompletedTasks;
