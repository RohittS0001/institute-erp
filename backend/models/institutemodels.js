import mongoose from "mongoose";

const InstituteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { 
  timestamps: true, 
  collection: 'InstituteIDs'   // Your chosen MongoDB collection name
});

const InstituteRecord = mongoose.models.InstituteRecord || mongoose.model("InstituteRecord", InstituteSchema);

export { InstituteRecord };
