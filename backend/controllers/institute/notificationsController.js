import Notification from "../models/Notification.js";

export const addNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const list = await Notification.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
