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

const Institute = () => {
  return (
    <div className="dashboard-wrapper">
      <main className="dashboard-content">
        <Routes>
          {/* Default page */}
          <Route index element={<InstituteDashboard />} />

          {/* Sub Routes */}
          <Route path="attendance" element={<Attendance />} />
          <Route path="courses" element={<Courses />} />
          <Route path="events" element={<Events />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="profile" element={<Profile />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />

          {/* If wrong path → redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default Institute;
