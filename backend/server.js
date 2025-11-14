import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from './routes/adminRoutes.js';
import adminCoursesRoutes from './routes/admin/coursesRoutes.js'; 
import adminFinancialsRoutes from './routes/admin/financialsRoutes.js';
import adminInstitutesRoutes from './routes/admin/institutesRoutes.js';
import adminNotificationsRoutes from './routes/admin/notificationsRoutes.js';
import adminReportsRoutes from './routes/admin/reportsRoutes.js';
import adminUsersRoutes from './routes/admin/usersRoutes.js';
import adminDashboardRoutes from './routes/admin/dashboardRoutes.js';





const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connect
connectDB();

// Simple API test route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Register routes
app.use("/api/admin", adminRoutes);
app.use('/api/admin/courses', adminCoursesRoutes);
app.use('/api/admin/financials', adminFinancialsRoutes);
app.use('/api/admin/institutes', adminInstitutesRoutes);
app.use('/api/admin/notifications', adminNotificationsRoutes);
app.use('/api/admin/reports', adminReportsRoutes);
app.use('/api/admin/users', adminUsersRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
