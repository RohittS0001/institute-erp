import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  recipient: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String } // Optionally extend with more info

},{ timestamps: true,
      collection: 'UserAward'
  });

export default mongoose.model("Award", awardSchema);
