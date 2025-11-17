// backend/models/admin/Financial.js
import mongoose from "mongoose";
const FinancialSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: String,
  status: { type: String, default: "Paid" }
}, { timestamps: true,
      collection: 'AdminFinancials'
 });
export default mongoose.model("Financial", FinancialSchema);
