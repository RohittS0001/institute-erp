// backend/models/admin/User.js
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "User" },   // e.g., User, Institute, etc.
  status: { type: String, default: "Active" },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("User", UserSchema);
