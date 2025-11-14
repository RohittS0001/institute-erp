import mongoose from "mongoose";

const ImmersionSchema = new mongoose.Schema({
  program: String,
  institution: String,
  startDate: String,
  endDate: String,
  description: String
});

export default mongoose.model("Immersion", ImmersionSchema);
