import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Backend data states
  const [admissions, setAdmissions] = useState([]);
  const [awards, setAwards] = useState([]);
  const [researches, setResearches] = useState([]);
  const [immersions, setImmersions] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [recentActivity, setRecentActivity] = useState([
    { text: "Upcoming Placement Drive", time: "In 1 day" },
    { text: "Membership Expiring Soon", time: "In 2 days" },
    { text: "Attended Research Seminar", time: "Today" },
    { text: "New Notice from Institute", time: "Just now" }
  ]);

  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/admissions").then(res => res.json()).then(setAdmissions);
    fetch("https://backenderp-production-6374.up.railway.app/api/awards").then(res => res.json()).then(setAwards);
    fetch("https://backenderp-production-6374.up.railway.app/api/research").then(res => res.json()).then(setResearches);
    fetch("https://backenderp-production-6374.up.railway.app/api/immersion").then(res => res.json()).then(setImmersions);
    fetch("https://backenderp-production-6374.up.railway.app/api/placement").then(res => res.json()).then(setPlacements);

    // Optionally, fetch recent activity from backend if you implement such an endpoint
    // fetch("http://localhost:4000/api/activity").then(res => res.json()).then(setRecentActivity);
  }, []);

  const widgetsData = [
    { title: "Admissions Assistance", value: admissions.length, icon: "", color: "#36b9cc", link: "/dashboard/user/admissions" },
    { title: "Awards & Recognition", value: awards.length, icon: "", color: "#4e73df", link: "/dashboard/user/awards" },
    { title: "Research Support", value: researches.length, icon: "", color: "#1cc88a", link: "/dashboard/user/research" },
    { title: "Academic–Industry Immersion", value: immersions.length > 0 ? "92%" : "0%", icon: "", color: "#f6c23e", link: "/dashboard/user/immersion" },
    { title: "Placement Support", value: placements.length, icon: "", color: "#1c3ec8", link: "/dashboard/user/placement" },
  ];

  const quickLinks = [
    { url: "/dashboard/user/profile", text: "My Profile", icon: "👤" },
    { url: "/dashboard/user/donation", text: "Donation", icon: "💰" },
    { url: "/dashboard/user/mou", text: "MOU", icon: "📄" },
    { url: "/dashboard/user/membership", text: "Membership", icon: "💳" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.href='/';
  };

  return (
    <div className="user-dashboard">
      <header className="user-header">
        <div>
          <h1> User Dashboard</h1>
          <p className="user-sub">Welcome to Saathaihum Foundation, Student!</p>
        </div>
        <input
          className="user-search"
          type="search"
          placeholder="Search courses, tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <nav className="user-nav">
        {quickLinks.map((link) => (
          <Link to={link.url} key={link.text} className="user-link">
            <span className="link-icon">{link.icon}</span> {link.text}
          </Link>
        ))}
      </nav>

      <main className="user-main">
        <section className="dashboard-widgets">
          {widgetsData.map((widget) => (
            <div
              key={widget.title}
              className="widget"
              style={{ borderLeft: `6px solid ${widget.color}`, cursor: "pointer" }}
              onClick={() => navigate(widget.link)}
            >
              <div className="widget-icon" style={{ color: widget.color }}>
                {widget.icon}
              </div>
              <div>
                <h2>{widget.title}</h2>
                <p>{widget.value}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.map((item, idx) => (
              <li key={idx}>
                {item.text} <span className="time">({item.time})</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
};

export default UserDashboard;


