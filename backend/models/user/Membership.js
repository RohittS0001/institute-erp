import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  organization: { type: String, required: true },
  membershipType: { type: String, required: true }, // Example: "Regular", "Premium"
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Optional: could be null for ongoing memberships
  status: { type: String, default: "active" }, // E.g., active, expired, pending
},{ timestamps: true,
      collection: 'UserMembership'
  });

export default mongoose.models.Membership || mongoose.model("Membership", membershipSchema);
