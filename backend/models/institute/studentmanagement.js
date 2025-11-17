import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  department: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  admissionYear: { type: Number },
  course: { type: String },
});

export default mongoose.model("Student", studentSchema);
