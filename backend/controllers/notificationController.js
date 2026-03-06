const Notification = require("../models/Notification");


// Create notification
exports.createNotification = async (userId, message, type) => {

  const notification = await Notification.create({
    user: userId,
    message,
    type
  });

  return notification;

};


// Get notifications for user
exports.getNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {

    res.status(500).json(error);

  }

};


// Mark notification as read
exports.markAsRead = async (req, res) => {

  try {

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(notification);

  } catch (error) {

    res.status(500).json(error);

  }

};