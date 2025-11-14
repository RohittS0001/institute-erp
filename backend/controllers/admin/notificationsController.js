// backend/controllers/admin/notificationsController.js
import Notification from "../../models/admin/Notification.js";

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    const saved = await notification.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to add notification" });
  }
};
