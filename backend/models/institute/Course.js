import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, default: "General" }, // FIXED
  instructor: { type: String },
  seats: { type: Number },
  duration: { type: String },
  credits: { type: Number, default: 4 },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  description: { type: String },
});


// Prevent OverwriteModelError
const Course = mongoose.model("Courses", courseSchema);

export default Course;
