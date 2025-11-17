import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
  instituteName: { type: String, required: true },
  address: { type: String },
  established: { type: Number },
  affiliation: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  about: { type: String },
});

// Prevent OverwriteModelError
const Institute =
  mongoose.models.Institute || mongoose.model("Institute", instituteSchema);

export default Institute;
