import Notification from "../../models/institute/Notification.js";

export const addNotification = async (req, res) => {
  try {
    const saved = await Notification.create(req.body);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const list = await Notification.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
