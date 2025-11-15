import mongoose from "mongoose";

const placementSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  package: { type: Number }, // e.g. annual CTC offered
  dateOfPlacement: { type: Date, required: true },
  status: { type: String, default: "placed" } // placed, pending, rejected
});

export default mongoose.models.Placement || mongoose.model("Placement", placementSchema);
