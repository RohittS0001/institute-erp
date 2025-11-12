import mongoose from "mongoose";

export const connectDB= async ()=>{
    await mongoose.connect('mongodb+srv://prajayfaldesai987_db_user:sw1Q2wdIw5ElcQvP@safhon.lv9v368.mongodb.net/INSTITUTE-ERP').then(()=>console.log("DB Connect"));
}