import mongoose from "mongoose";

const mouSchema = new mongoose.Schema({
  title: { type: String, required: true },
  partnerOrganization: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Can be ongoing
  description: { type: String },
  status: { type: String, default: "active" }, // active, expired, pending
});

export default mongoose.models.MOU || mongoose.model("MOU", mouSchema);
