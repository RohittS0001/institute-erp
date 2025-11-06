import React, { useState } from "react";
import "./institute.css";

const widgetsData = [
  { title: "Total Departments", value: 12, icon: "🏢", color: "#4e73df" },
  { title: "Faculty Members", value: 75, icon: "👩‍🏫", color: "#1cc88a" },
  { title: "Ongoing Courses", value: 24, icon: "📚", color: "#f6c23e" },
  { title: "Events Scheduled", value: 5, icon: "📅", color: "#36b9cc" },
  { title: "Pending Approvals", value: 3, icon: "⏳", color: "#e74a3b" },
];

const recentActivities = [
  { text: "New research paper published", time: "1 hour ago" },
  { text: "Scheduled faculty meeting", time: "today" },
  { text: "Course enrollment opened", time: "yesterday" },
  { text: "Received accreditation renewal", time: "3 days ago" },
];

const quickLinks = [
  { url: "#", text: "Department Management" },
  { url: "#", text: "Faculty Directory" },
  { url: "#", text: "Course Management" },
  { url: "#", text: "Event Calendar" },
  { url: "#", text: "Institution Settings" },
];

const InstituteDashboard = () => {
  const [search, setSearch] = useState("");

  const filteredActivities = recentActivities.filter((activity) =>
    activity.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="institute-dashboard">
      {/* Header Section */}
      <header className="institute-header">
        <div>
          <h1>🏫 Institute Dashboard</h1>
          <p className="institute-sub">Welcome to your institution admin panel</p>
        </div>

        <input
          className="institute-search"
          type="search"
          placeholder="Search activities, departments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search activities or departments"
        />
      </header>

      {/* Navigation Links */}
      <nav className="institute-nav">
        {quickLinks.map((link) => (
          <a key={link.text} href={link.url} aria-label={link.text}>
            {link.text}
          </a>
        ))}
      </nav>

      {/* Main Dashboard */}
      <main className="institute-main">
        {/* Widget Cards */}
        <section className="dashboard-widgets">
          {widgetsData.map((widget) => (
            <div
              className="widget"
              key={widget.title}
              style={{ borderLeft: `6px solid ${widget.color}` }}
            >
              <div
                className="widget-icon"
                style={{ color: widget.color }}
                aria-hidden="true"
              >
                {widget.icon}
              </div>
              <div>
                <h2>{widget.title}</h2>
                <p>{widget.value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Activity Section */}
        <section className="recent-activity">
          <h2>Recent Activities</h2>
          <ul>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => (
                <li key={index}>
                  {activity.text}{" "}
                  <span className="time">({activity.time})</span>
                </li>
              ))
            ) : (
              <li>No matching activities found.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default InstituteDashboard;
