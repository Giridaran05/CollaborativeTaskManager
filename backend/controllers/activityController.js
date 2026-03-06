const Activity = require("../models/Activity");


// Get Activity Logs
exports.getActivities = async (req, res) => {

  try {

    const activities = await Activity.find()
      .populate("user", "name email")
      .populate("task", "title")
      .sort({ createdAt: -1 });

    res.json(activities);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};