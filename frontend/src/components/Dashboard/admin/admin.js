import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminDashboard from "./AdminDashboard";
import Institutes from "./Institutes";
import Users from "./Users";
import AdminImmersion from "./AdminImmersion";
import Financials from "./Financials";
import Reports from "./Reports";
import Notifications from "./Notifications";
import Placements from "./Placements";
import "./admin.css";

const Admin = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="admin" element={<AdminDashboard />} /> 
          <Route path="institutes" element={<Institutes />} />
          <Route path="users" element={<Users />} />
          <Route path="AdminImmersion" element={<AdminImmersion />} />
          <Route path="financials" element={<Financials />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="Placements" element={<Placements />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
