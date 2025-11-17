// backend/models/admin/Institute.js
import mongoose from "mongoose";
const InstituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contactEmail: String,
  contactPhone: String,
  status: { type: String, default: "Active" }
},{ timestamps: true,
      collection: 'AdminInstitutes'
 });
export default mongoose.model("Institute", InstituteSchema);
