import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  researcherName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  summary: { type: String },
  status: { type: String, default: "ongoing" }, // ongoing, completed, pending review
},{ timestamps: true,
      collection: 'UserResearch'
  });

export default mongoose.models.Research || mongoose.model("Research", researchSchema);
