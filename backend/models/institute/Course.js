import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  duration: { type: String },
  credits: { type: Number, default: 4 },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  description: { type: String },
});

// Prevent OverwriteModelError
const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
