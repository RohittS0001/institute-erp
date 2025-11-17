import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Leave"],
    required: true,
  },
});

export default mongoose.model("Attendance", attendanceSchema);
