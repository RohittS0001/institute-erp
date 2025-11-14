import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from './routes/user/adminRoutes.js';


// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connect
connectDB();

// routes
app.use("/api/admin", adminRoutes);


// base route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

// mongodb+srv://prajayfaldesai987_db_user:sw1Q2wdIw5ElcQvP@safhon.lv9v368.mongodb.net/?appName=SAFHON



