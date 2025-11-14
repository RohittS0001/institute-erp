import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState({
    totalInstitutes: 0,
    activeUsers: 0,
    coursesOffered: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/dashboard");
        setDashboardSummary({
          totalInstitutes: response.data.institutesCount || 0,
          activeUsers: response.data.usersCount || 0,
          coursesOffered: response.data.coursesCount || 0,
          pendingApprovals: response.data.notificationsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    const fetchInstitutes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/institutes");
        setInstitutes(response.data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
        setInstitutes([]);
      }
    };

    fetchDashboardSummary();
    fetchInstitutes();
  }, []);

  const filteredInstitutes = institutes.filter(
    (inst) =>
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      (inst.location && inst.location.toLowerCase().includes(search.toLowerCase())) ||
      (inst.status && inst.status.toLowerCase().includes(search.toLowerCase()))
  );

  const widgetsData = [
    { title: "Total Institutes", icon: "🏫", color: "#5c71e7ff", value: dashboardSummary.totalInstitutes, path: "institutes" },
    { title: "Active Users", icon: "👥", color: "#f50057", value: dashboardSummary.activeUsers, path: "users" },
    { title: "Courses Offered", icon: "📚", color: "#ff9800", value: dashboardSummary.coursesOffered, path: "courses" },
    { title: "Pending Approvals", icon: "⏳", color: "#009688", value: dashboardSummary.pendingApprovals, path: "notifications" },
  ];

  return (
    <main className="dashboard-content">
      <header className="dashboard-header">
        <h1>Admin</h1>
        <input
          type="text"
          placeholder="Search institutes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </header>

      <section className="widgets-section">
        {widgetsData.map((w) => (
          <div
            key={w.title}
            className="widget-card"
            style={{ borderTop: `4px solid ${w.color}`, cursor: 'pointer' }}
            onClick={() => navigate(`/dashboard/admin/${w.path}`)}
          >
            <div className="widget-icon" style={{ backgroundColor: w.color }}>
              {w.icon}
            </div>
            <div className="widget-info">
              <h3>{w.value.toLocaleString()}</h3>
              <p>{w.title}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="institutes-table-section">
        <h2>Institutes Overview</h2>
        <table className="institutes-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstitutes.length ? (
              filteredInstitutes.map((inst) => (
                <tr key={inst.id || inst._id}>
                  <td>{inst.name}</td>
                  <td>{inst.location || "N/A"}</td>
                  <td>
                    <span className={`status-indicator ${inst.status?.toLowerCase()}`}>
                      {inst.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn view-btn">View</button>
                    <button className="btn edit-btn">Edit</button>
                    <button className="btn delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No institutes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default AdminDashboard;
