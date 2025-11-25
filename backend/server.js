// backend/server.js
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import departmentRoutes from "./routes/institute/departmentRoute.js";
import studentRoutes from "./routes/institute/studentmanagementRoute.js";
import facultyRoutes from "./routes/institute/facultyRoute.js";
import courseRoutes from "./routes/institute/courseRoute.js";
import attendanceRoutes from "./routes/institute/attendenceRoute.js";
import eventRoutes from "./routes/institute/eventRoute.js";
import profileRoutes from "./routes/institute/profileRoute.js";
import notificationRoutes from "./routes/institute/notificationRoute.js";
import reportRoutes from "./routes/institute/reportsRoute.js";
import dashboardRoutes from "./routes/institute/dashboardRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ---------------------- API ROUTES -------------------------
app.use("/api/institute/departments", departmentRoutes);
app.use("/api/institute/students", studentRoutes);
app.use("/api/institute/faculty", facultyRoutes);
app.use("/api/institute/courses", courseRoutes);
app.use("/api/institute/attendance", attendanceRoutes);
app.use("/api/institute/events", eventRoutes);
app.use("/api/institute/profile", profileRoutes);
app.use("/api/institute/notifications", notificationRoutes);
app.use("/api/institute/reports", reportRoutes);
app.use("/api/institute/dashboard", dashboardRoutes);

// ---------------------- DEFAULT ROUTE -----------------------
app.get("/", (_req, res) => {
  res.send("INSTITUTE ERP – MySQL Backend Running ✅");
});

// ---------------------- START SERVER ------------------------
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await connectDB();
});
