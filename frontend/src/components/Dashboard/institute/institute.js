import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import InstituteDashboard from "./InstituteDashboard";
import Attendance from "./Attendance";
import Courses from "./Courses";
import Events from "./Events";
import Faculty from "./Faculty";
import Profile from "./Profile";
import StudentManagement from "./StudentManagement";
import Reports from "./Reports";
import Notifications from "./Notifications";

// Use "Institute" or "Admin" based on your naming
const Institute = () => {
  return (
    <div className="dashboard-wrapper">
      <main className="dashboard-content">
        <Routes>
          <Route index element={<InstituteDashboard />} />
          {/* Subpage routes */}
          <Route path="attendance" element={<Attendance />} />
          <Route path="courses" element={<Courses />} />
          <Route path="events" element={<Events />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="profile" element={<Profile />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          
          {/* Optional: catch all for undefined routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default Institute;
