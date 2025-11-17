import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String },
  target: {
    type: String,
    enum: ["All", "Students", "Faculty"],
    default: "All",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
});

// Prevent OverwriteModelError
const Notification =
  mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default Notification;
