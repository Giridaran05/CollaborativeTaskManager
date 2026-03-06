const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {

    const tasks = await Task.find();

    const statusCount = {
      "To Do": 0,
      "In Progress": 0,
      "Review": 0,
      "Done": 0
    };

    tasks.forEach(task => {
      statusCount[task.status] += 1;
    });

    const tasksByStatus = Object.keys(statusCount).map(status => ({
      status,
      count: statusCount[status]
    }));

    res.json({
      totalTasks: tasks.length,
      tasksByStatus
    });

  } catch (error) {
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;