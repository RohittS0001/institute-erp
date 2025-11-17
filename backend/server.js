import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";



// admin
import adminRoutes from './routes/adminRoutes.js';
import adminCoursesRoutes from './routes/admin/coursesRoutes.js'; 
import adminFinancialsRoutes from './routes/admin/financialsRoutes.js';
import adminInstitutesRoutes from './routes/admin/institutesRoutes.js';
import adminNotificationsRoutes from './routes/admin/notificationsRoutes.js';
import adminReportsRoutes from './routes/admin/reportsRoutes.js';
import adminUsersRoutes from './routes/admin/usersRoutes.js';
import adminDashboardRoutes from './routes/admin/dashboardRoutes.js';
import adminSettingsRoutes from "./routes/admin/settingsRoutes.js";




// user
import userRoutes from './routes/userRoutes.js';
import awardRoutes from './routes/user/awardRoutes.js';
import donationRoutes from './routes/user/donationRoutes.js';
import immersionRoutes from './routes/user/immersionRoutes.js';
import membershipRoutes from './routes/user/membershipRoutes.js';
import mouRoutes from './routes/user/mouRoutes.js';
import placementRoutes from './routes/user/placementRoutes.js';
import profileRoutes from './routes/user/profileRoutes.js';
import researchRoutes from './routes/user/researchRoutes.js';
import userDashboardRoutes from './routes/user/userDashboardRoutes.js';


// institute
import attendenceRoute from './routes/institute/attendenceRoute.js';
import courseRoute from './routes/institute/courseRoute.js';
import dashboardRoute from './routes/institute/dashboardRoute.js';
import eventRoute from './routes/institute/eventRoute.js';
import facultyRoute from './routes/institute/facultyRoute.js';
import instituteRoute from './routes/institute/instituteRoute.js';
import profileRouteInstitute from './routes/institute/profileRoute.js';
import reportsRoute from './routes/institute/reportsRoute.js';
import studentManagementRoute from './routes/institute/studentmanagementRoute.js';
import notificationRoute from './routes/institute/notificationRoute.js';


const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("API WORKING");
});


app.use("/api/admin", adminRoutes);
app.use('/api/admin/courses', adminCoursesRoutes);
app.use('/api/admin/financials', adminFinancialsRoutes);
app.use('/api/admin/institutes', adminInstitutesRoutes);
app.use('/api/admin/notifications', adminNotificationsRoutes);
app.use('/api/admin/reports', adminReportsRoutes);
app.use('/api/admin/users', adminUsersRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);


//user
app.use("/api/user", userRoutes);
app.use("/api/awards", awardRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/immersion", immersionRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/mou", mouRoutes);
app.use("/api/placement", placementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/userdashboard", userDashboardRoutes);


// Institute routes
app.use("/api/institute/attendance", attendenceRoute);
app.use("/api/institute/course", courseRoute);
app.use("/api/institute/dashboard", dashboardRoute);
app.use("/api/institute/events", eventRoute);
app.use("/api/institute/faculty", facultyRoute);
app.use("/api/institute/info", instituteRoute);
app.use("/api/institute/notifications", notificationRoute);
app.use("/api/institute/profile", profileRouteInstitute);
app.use("/api/institute/reports", reportsRoute);
app.use("/api/institute/students", studentManagementRoute);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
