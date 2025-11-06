import React, { useState } from 'react';
import './admin.css';

const widgetsData = [
  { title: "Total Users", value: 150, icon: "👥", color: "#4e73df" },
  { title: "Active Sessions", value: 23, icon: "🟢", color: "#1cc88a" },
  { title: "Pending Approvals", value: 8, icon: "⏳", color: "#f6c23e" },
  { title: "Revenue This Month", value: "$12,300", icon: "💰", color: "#36b9cc" },
  { title: "New Registrations", value: 12, icon: "🆕", color: "#e74a3b" },
  { title: "Courses", value: 36, icon: "📚", color: "#f6c23e" },
];

const recentUsers = [
  { name: "John Doe", activity: "Logged in", time: "2 min ago" },
  { name: "Jane Smith", activity: "Updated profile", time: "20 min ago" },
  { name: "Emily Davis", activity: "Requested access", time: "42 min ago" },
  { name: "Rahul Kumar", activity: "Logged out", time: "1 hour ago" },
];

const quickLinks = [
  { url: "#", text: "Manage Users" },
  { url: "#", text: "Manage Courses" },
  { url: "#", text: "Generate Reports" },
  { url: "#", text: "Audit Logs" },
  { url: "#", text: "Faculty" },
  { url: "#", text: "Profile" },
  { url: "#", text: "Settings" },
];

// Helper: Format numbers with commas
const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const AdminDashboard = () => {
  const [search, setSearch] = useState('');

  // Filter recent activity based on search
  const filteredActivity = recentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.activity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>👤 Admin Dashboard</h1>
          <div className="admin-sub">Welcome, System Administrator</div>
        </div>
        <input
          className="admin-search"
          type="search"
          placeholder="Search users, reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search users or reports"
        />
      </header>

      <nav className="admin-nav">
        {quickLinks.map((link) => (
          <a href={link.url} key={link.text} aria-label={link.text}>
            {link.text}
          </a>
        ))}
      </nav>

      <main className="admin-main">
        <section className="dashboard-widgets">
          {widgetsData.map((widget) => (
            <div
              className="widget"
              style={{ borderLeft: `6px solid ${widget.color}` }}
              key={widget.title}
              aria-label={`${widget.title}: ${widget.value}`}
            >
              <div className="widget-icon" style={{ color: widget.color }} aria-hidden="true">
                {widget.icon}
              </div>
              <div>
                <h2>{widget.title}</h2>
                <p>{typeof widget.value === 'number' ? formatNumber(widget.value) : widget.value}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="recent-activity">
          <h2>Recent User Activity</h2>
          <ul>
            {filteredActivity.length ? (
              filteredActivity.map((user, idx) => (
                <li key={idx}>
                  <span className="user">{user.name}</span> – {user.activity}{' '}
                  <span className="time">({user.time})</span>
                </li>
              ))
            ) : (
              <li>No matching activity found.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
