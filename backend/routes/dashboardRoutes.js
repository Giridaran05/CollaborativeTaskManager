const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {

    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "completed" });
    const pendingTasks = await Task.countDocuments({ status: "pending" });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks
    });

  } catch (error) {
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;