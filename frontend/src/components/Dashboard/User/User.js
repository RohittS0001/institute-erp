import React, { useState } from 'react';
import './User.css';

const widgetsData = [
  { title: "Admissions Assistance", value: 4, icon: "📚", color: "#36b9cc" },
  { title: "Awards & Recognition", value: 2, icon: "📝", color: "#4e73df" },
  { title: "Research Support", value: 3, icon: "📄", color: "#1cc88a" },
  { title: "Academic–Industry Immersion", value: "92%", icon: "📊", color: "#f6c23e" },
  { title: "Placement Support", value: 3, icon: "🎓", color: "#1c3ec8ff" },
];

const quickLinks = [
  { url: "#", text: "My Profile" },
  { url: "#", text: "Donation" },
  { url: "#", text: "Research" },
  { url: "#", text: "Membership" },
];

const recentActivity = [
  { text: "Upcoming Placement", time: " In 1 hour " },
  { text: "Membership", time: "Expire in 2 days" },
  { text: "Attended ", time: "today" },
  { text: "New notice from Institute", time: "just now" },
];

const UserDashboard = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="user-dashboard">
      <header className="user-header">
        <div>
          <h1>🎓 User Dashboard</h1>
          <div className="user-sub">Welcome to Saathaihum Foundation , Student!</div>
        </div>
        <input
          className="user-search"
          type="search"
          placeholder="Search courses, tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      <nav className="user-nav">
        {quickLinks.map(link => (
          <a href={link.url} key={link.text}>{link.text}</a>
        ))}
      </nav>

      <main className="user-main">
        <section className="dashboard-widgets">
          {widgetsData.map(widget => (
            <div
              className="widget"
              style={{ borderLeft: `6px solid ${widget.color}` }}
              key={widget.title}
            >
              <div className="widget-icon" style={{ color: widget.color }}>{widget.icon}</div>
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
    </div>
  );
};

export default UserDashboard;
