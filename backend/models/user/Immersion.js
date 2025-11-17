import mongoose from "mongoose";

const immersionSchema = new mongoose.Schema({
  program: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
},{ timestamps: true,
      collection: 'UserImmersion'
  });

export default mongoose.model("Immersion", immersionSchema);
