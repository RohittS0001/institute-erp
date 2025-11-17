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
}, { timestamps: true,
      collection: 'InstituteIDs'
 });

export const Institute = mongoose.model("Institute", InstituteSchema);
