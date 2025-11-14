import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Admin from "./components/Dashboard/admin/admin";
import UserDashboard from "./components/Dashboard/User/User";
import InstituteDashboard from "./components/Dashboard/institute/institute";


import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const ProtectedRoute = ({ element }) =>
    user?.role === "user" ? element : <Navigate to="/" />;

  const AdminRoute = ({ element }) =>
    user?.role === "admin" ? element : <Navigate to="/" />;

  const InstituteRoute = ({ element }) =>
    user?.role === "institute" ? element : <Navigate to="/" />;

  return (
    <Router>
      <Routes>
        {/* Login or Redirect */}
        <Route
          path="/"
element={user ? <Navigate to={`/dashboard/${user.role}`} /> : <Login />}

        />

        {/* Admin Dashboard Container - with nested routing */}
        <Route
          path="/dashboard/admin/*"
          element={<AdminRoute element={<Admin />} />}
        />

        {/* Institute Dashboard */}
        <Route
          path="/dashboard/institute/*"
          element={<InstituteRoute element={<InstituteDashboard />} />}
        />

        {/* User Dashboard */}
        <Route
          path="/dashboard/user/*"
          element={<ProtectedRoute element={<UserDashboard />} />}
        />

      

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;