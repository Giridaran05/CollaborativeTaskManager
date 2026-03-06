const Task = require("../models/Task");

exports.getDashboardStats = async (req, res) => {

  try {

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "done"
    });

    const overdueTasks = await Task.countDocuments({
      deadline: { $lt: new Date() },
      status: { $ne: "done" }
    });

    const tasksByStatus = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalTasks,
      completedTasks,
      overdueTasks,
      tasksByStatus
    });

  } catch (error) {

    res.status(500).json(error);

  }

};