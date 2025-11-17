// backend/models/admin/Notification.js
import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: String,
  date: { type: Date, default: Date.now },
  recipient: String, // e.g., could be institute, user, "all"
  status: { type: String, default: "Active" }
}, { timestamps: true,
      collection: 'AdminNotifications'
 });
export default mongoose.model("Notification", NotificationSchema);
