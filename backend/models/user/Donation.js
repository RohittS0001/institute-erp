import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  purpose: { type: String },
},{ timestamps: true,
      collection: 'UserDonation'
  });

export default mongoose.model("Donation", donationSchema);
