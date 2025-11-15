import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Updated imports (based on remote main branch)

//port adminRoutes from './routes/adminRoutes.js';
import adminCoursesRoutes from './routes/admin/coursesRoutes.js'; 
import adminFinancialsRoutes from './routes/admin/financialsRoutes.js';
import adminInstitutesRoutes from './routes/admin/institutesRoutes.js';
import adminNotificationsRoutes from './routes/admin/notificationsRoutes.js';
import adminReportsRoutes from './routes/admin/reportsRoutes.js';
import adminUsersRoutes from './routes/admin/usersRoutes.js';
import adminDashboardRoutes from './routes/admin/dashboardRoutes.js';

// user
//port userRoutes from './routes/user/userRoutes.js';
import awardRoutes from './routes/user/awardRoutes.js';
import donationRoutes from './routes/user/donationRoutes.js';
import immersionRoutes from './routes/user/immersionRoutes.js';
import membershipRoutes from './routes/user/membershipRoutes.js';
import mouRoutes from './routes/user/mouRoutes.js';
import placementRoutes from './routes/user/placementRoutes.js';
import profileRoutes from './routes/user/profileRoutes.js';
import researchRoutes from './routes/user/researchRoutes.js';




// App config
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
//p.use("/api/admin", adminRoutes);
app.use('/api/admin/courses', adminCoursesRoutes);
app.use('/api/admin/financials', adminFinancialsRoutes);
app.use('/api/admin/institutes', adminInstitutesRoutes);
app.use('/api/admin/notifications', adminNotificationsRoutes);
app.use('/api/admin/reports', adminReportsRoutes);
app.use('/api/admin/users', adminUsersRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);



//user
//p.use("/api/user", userRoutes);
app.use("/api/awards", awardRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/immersion", immersionRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/mou", mouRoutes);
app.use("/api/placement", placementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/research", researchRoutes);








// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

