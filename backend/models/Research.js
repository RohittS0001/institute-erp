import mongoose from "mongoose";

const ResearchSchema = new mongoose.Schema({
  topic: String,
  author: String,
  publishedDate: String, // Use Date in production if preferred
  summary: String
});

export default mongoose.model("Research", ResearchSchema);
