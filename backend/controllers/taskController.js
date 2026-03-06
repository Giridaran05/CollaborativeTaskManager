const Task = require("../models/Task");
const Notification = require("../models/Notification");
const Activity = require("../models/Activity");


// Create Task
exports.createTask = async (req, res) => {
  try {

    const task = await Task.create(req.body);

    // Notifications
    if (task.assignedUsers && task.assignedUsers.length > 0) {

      for (const userId of task.assignedUsers) {

        await Notification.create({
          user: userId,
          message: `You were assigned to task: ${task.title}`,
          type: "task_assigned"
        });

      }

    }

    // Activity Log
    await Activity.create({
      user: req.user.id,
      action: `created task ${task.title}`,
      task: task._id,
      project: task.project
    });

    res.json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get tasks by project
exports.getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      project: req.params.projectId
    })
      .populate("assignedUsers")
      .populate("comments.user");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update task
exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("assignedUsers")
      .populate("comments.user");

    // Activity Log
    await Activity.create({
      user: req.user.id,
      action: `updated task ${task.title}`,
      task: task._id
    });

    res.json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete task
exports.deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    await Task.findByIdAndDelete(req.params.id);

    // Activity Log
    await Activity.create({
      user: req.user.id,
      action: `deleted task ${task.title}`,
      task: task._id
    });

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Add comment
exports.addComment = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    const comment = {
      user: req.user.id,
      text: req.body.text
    };

    task.comments.push(comment);

    await task.save();

    // Activity Log
    await Activity.create({
      user: req.user.id,
      action: `commented on task ${task.title}`,
      task: task._id
    });

    const updatedTask = await Task.findById(req.params.id)
      .populate("assignedUsers")
      .populate("comments.user");

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 🔎 Search & Filter Tasks
exports.searchTasks = async (req, res) => {
  try {

    const { title, priority, status, assignedUser, deadline } = req.query;

    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (priority) {
      filter.priority = priority;
    }

    if (status) {
      filter.status = status;
    }

    if (assignedUser) {
      filter.assignedUsers = assignedUser;
    }

    if (deadline) {
      filter.deadline = { $lte: new Date(deadline) };
    }

    const tasks = await Task.find(filter)
      .populate("assignedUsers")
      .populate("comments.user");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};