import mongoose from "mongoose";

const AdmissionsSchema = new mongoose.Schema({
  name: String,
  course: String,
  date: Date,
  // other admission fields
});

export default mongoose.model("Admissions", AdmissionsSchema);
