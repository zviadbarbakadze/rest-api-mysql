const TasksService = require("../services/TaskService");
const tasksService = new TasksService();
async function addTask(req, res) {
  const { title, description } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(500).json({ message: "User data missing or corrupted" });
  }

  try {
    const newTask = await tasksService.addTask(user, { title, description });

    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to add task" });
  }
}
module.exports = addTask;
