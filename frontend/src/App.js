import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";

import Admin from "./components/Dashboard/admin/admin";
import InstituteDashboard from "./components/Dashboard/institute/institute";
import UserDashboard from "./components/Dashboard/User/User";

import Admissions from "./components/Dashboard/User/Admissions";
import Awards from "./components/Dashboard/User/Awards";
import Research from "./components/Dashboard/User/Research";
import Immersion from "./components/Dashboard/User/Immersion";
import Placement from "./components/Dashboard/User/Placement";
import Profile from "./components/Dashboard/User/Profile";
import Donation from "./components/Dashboard/User/Donation";
import MOU from "./components/Dashboard/User/MOU";
import Membership from "./components/Dashboard/User/Membership";

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
        {/* Root path, redirect if logged in */}
        <Route
          path="/"
          element={user ? <Navigate to={`/dashboard/${user.role}`} /> : <Login />}
        />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Admin dashboard */}
        <Route
          path="/dashboard/admin/*"
          element={<AdminRoute element={<Admin />} />}
        />

        {/* Institute dashboard */}
        <Route
          path="/dashboard/institute/*"
          element={<InstituteRoute element={<InstituteDashboard />} />}
        />

        {/* User dashboard */}
        <Route
          path="/dashboard/user/*"
          element={<ProtectedRoute element={<UserDashboard />} />}
        />

        {/* User sub-pages */}
        <Route
          path="/dashboard/user/admissions"
          element={<ProtectedRoute element={<Admissions />} />}
        />
        <Route
          path="/dashboard/user/awards"
          element={<ProtectedRoute element={<Awards />} />}
        />
        <Route
          path="/dashboard/user/research"
          element={<ProtectedRoute element={<Research />} />}
        />
        <Route
          path="/dashboard/user/immersion"
          element={<ProtectedRoute element={<Immersion />} />}
        />
        <Route
          path="/dashboard/user/placement"
          element={<ProtectedRoute element={<Placement />} />}
        />
        <Route
          path="/dashboard/user/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/dashboard/user/donation"
          element={<ProtectedRoute element={<Donation />} />}
        />
        <Route
          path="/dashboard/user/mou"
          element={<ProtectedRoute element={<MOU />} />}
        />
        <Route
          path="/dashboard/user/membership"
          element={<ProtectedRoute element={<Membership />} />}
        />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
