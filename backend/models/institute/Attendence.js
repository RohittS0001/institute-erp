import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "Student"
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Leave"],
    required: true
  }
});

export default mongoose.model("Attendance", attendanceSchema);
