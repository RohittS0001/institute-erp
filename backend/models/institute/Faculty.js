import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  designation: { type: String },
  qualification: { type: String },
  joiningDate: { type: String },
});

export default mongoose.model("Faculty", facultySchema);
