import mongoose from "mongoose";

const AwardsSchema = new mongoose.Schema({
  title: String,
  recipient: String,
  date: String  // Use String for simplicity, Date for real apps
});

export default mongoose.model("Awards", AwardsSchema);
