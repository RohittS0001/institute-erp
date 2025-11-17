// backend/models/admin/Report.js
import mongoose from "mongoose";
const ReportSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "Financial", "Course", etc.
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: String,
  status: { type: String, default: "Active" }
}, { timestamps: true,
      collection: 'AdminReports'
 });
export default mongoose.model("Report", ReportSchema);
