import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bio: { type: String },
  education: { type: String },
  skills: [String],
  experience: { type: String },
  contact: {
    email: { type: String },
    phone: { type: String },
  },
  updatedAt: { type: Date, default: Date.now }
},{ timestamps: true,
      collection: 'UserProfile'
  });

export default mongoose.models.Profile || mongoose.model("Profile", profileSchema);
