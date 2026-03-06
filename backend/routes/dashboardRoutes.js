const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {

    const tasks = await Task.find();

    const completed = tasks.filter(t => t.status === "completed").length;
    const pending = tasks.filter(t => t.status === "pending").length;

    res.json({
      totalTasks: tasks.length,
      tasksByStatus: [
        { status: "completed", count: completed },
        { status: "pending", count: pending }
      ]
    });

  } catch (error) {
    res.status(500).json({ message: "Error loading dashboard" });
  }
});

module.exports = router;