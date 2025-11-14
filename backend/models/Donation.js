import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  donor: String,
  amount: Number,
  date: String,
  purpose: String
});

export default mongoose.model("Donation", DonationSchema);
