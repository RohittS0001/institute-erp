import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://prajayfaldesai987_db_user:sw1Q2wdIw5ElcQvP@safhon.lv9v368.mongodb.net/INSTITUTE-ERP',
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
      }
    );
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};
