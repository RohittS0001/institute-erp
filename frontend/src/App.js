import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// --- Dashboard Imports ---
import User from "./components/Dashboard/User/User";
import Admin from "./components/Dashboard/admin/admin";
import Institute from "./components/Dashboard/institute/institute";

// --- Login Page ---
import Login from "./components/Login/Login"; // ✅ Add your login component

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route (redirect to User Dashboard) */}
        <Route path="/" element={<Navigate to="/dashboard/user" />} />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* USER DASHBOARD -- All user subpages inside User.js */}
        <Route path="/dashboard/user/*" element={<User />} />

        {/* ADMIN & INSTITUTE DASHBOARDS */}
        <Route path="/dashboard/admin" element={<Admin />} />
        <Route path="/dashboard/institute" element={<Institute />} />
      </Routes>
    </Router>
  );
}

export default App;





