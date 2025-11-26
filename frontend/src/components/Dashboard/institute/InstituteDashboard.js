import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./InstituteDashboard.css";

export default function InstituteDashboard() {
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    attendance: 0,
    courses: 0,
    events: 0,
    faculty: 0,
    students: 0,
    notifications: 0,
  });

  const navigate = useNavigate();

  // Fetch dashboard stats from backend
  useEffect(() => {
    axios.get("http://localhost:4000/api/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log("Error:", err));
  }, []);

  const widgetFeatures = [
    { title: "Attendance", value: stats.attendance, icon: "📝", color: "#36b9cc", link: "/dashboard/institute/attendance", desc: "Daily student tracking" },
    { title: "Courses", value: stats.courses, icon: "📚", color: "#4e73df", link: "/dashboard/institute/courses", desc: "Manage courses" },
    { title: "Events", value: stats.events, icon: "🎉", color: "#f6c23e", link: "/dashboard/institute/events", desc: "Institute events" },
    { title: "Faculty", value: stats.faculty, icon: "👩‍🏫", color: "#1cc88a", link: "/dashboard/institute/faculty", desc: "Faculty directory" },
    { title: "Students", value: stats.students, icon: "👨‍🎓", color: "#1c3ec8", link: "/dashboard/institute/students", desc: "Student management" },
    { title: "Notifications", value: stats.notifications, icon: "🔔", color: "#a636db", link: "/dashboard/institute/notifications", desc: "View notifications" },
  ];

  const quickLinks = [
    { url: "/dashboard/institute/profile", text: "My Profile", icon: "👤" },
    { url: "/dashboard/institute/events", text: "Institute Events", icon: "📅" },
    { url: "/dashboard/institute/reports", text: "Analytics", icon: "📊" },

  ];

  const filteredWidgets = widgetFeatures.filter(
    (w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inst-dashboard">
      <header className="inst-header">
        <div>
          <h1> Institute Dashboard</h1>
          <p className="inst-sub">Your central place for institute management</p>
        </div>

        <input
          className="inst-search"
          type="search"
          placeholder="Search features, students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {/* Quick Links */}
      <nav className="inst-nav">
        {quickLinks.map((link) => (
          <Link to={link.url} key={link.text} className="inst-link">
            <span className="link-icon">{link.icon}</span> {link.text}
          </Link>
        ))}
      </nav>

      {/* Widgets */}
      <main className="inst-main">
        <section className="inst-widgets">
          {filteredWidgets.map((widget) => (
            <div
              key={widget.title}
              className="widget"
              style={{ borderLeft: `6px solid ${widget.color}` }}
              onClick={() => navigate(widget.link)}
            >
              <div className="widget-icon" style={{ color: widget.color }}>
                {widget.icon}
              </div>
              <div>
                <h2>{widget.title}</h2>
                <p className="widget-value">{widget.value}</p>
                <div className="widget-desc">{widget.desc}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Activity */}
        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>Conducted Semester Exams (50 min ago)</li>
            <li>Student Admission Approved (Today)</li>
            <li>Faculty Joined: Dr. Mehta (Yesterday)</li>
            <li>New Course Introduced: AI Fundamentals (This week)</li>
          </ul>
        </section>
      </main>
    </div>
  );
}



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./InstituteDashboard.css";

// const widgetFeatures = [
//   { title: "Attendance", value: 150, icon: "📝", color: "#36b9cc", link: "/dashboard/institute/attendance", desc: "Daily student tracking" },
//   { title: "Courses", value: 32, icon: "📚", color: "#4e73df", link: "/dashboard/institute/courses", desc: "Manage courses" },
//   { title: "Events", value: 8, icon: "🎉", color: "#f6c23e", link: "/dashboard/institute/events", desc: "Institute events" },
//   { title: "Faculty", value: 23, icon: "👩‍🏫", color: "#1cc88a", link: "/dashboard/institute/faculty", desc: "Faculty directory" },
//   { title: "Students", value: 400, icon: "👨‍🎓", color: "#1c3ec8", link: "/dashboard/institute/students", desc: "Student management" },
//   { title: "Profile", value: 1, icon: "🏫", color: "#2d972f", link: "/dashboard/institute/profile", desc: "Institute profile" },
//   { title: "Reports", value: 12, icon: "📈", color: "#ea5d48", link: "/dashboard/institute/reports", desc: "Analytics & reports" },
//   { title: "Notifications", value: 5, icon: "🔔", color: "#a636db", link: "/dashboard/institute/notifications", desc: "View notifications" },
// ];

// const quickLinks = [
//   { url: "/dashboard/institute/profile", text: "My Profile", icon: "👤" },
//   { url: "/dashboard/institute/events", text: "Institute Events", icon: "📅" },
//   { url: "/dashboard/institute/reports", text: "Analytics", icon: "📊" },
//   { url: "/dashboard/institute/settings", text: "Settings", icon: "⚙️" },
// ];

// const recentActivity = [
//   { text: "Conducted Semester Exams", time: "1 hour ago" },
//   { text: "Student Admission Approved", time: "Today" },
//   { text: "Faculty Joined: Dr. Mehta", time: "Yesterday" },
//   { text: "New Course Introduced: AI Fundamentals", time: "This week" },
// ];

// export default function InstituteDashboard() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   // Optionally filter widgets with search
//   const filteredWidgets = widgetFeatures.filter(
//     (w) =>
//       w.title.toLowerCase().includes(search.toLowerCase()) ||
//       w.desc.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="inst-dashboard">
//       {/* Header */}
//       <header className="inst-header">
//         <div>
//           <h1>🏫 Institute Dashboard</h1>
//           <p className="inst-sub">Your central place for institute management</p>
//         </div>
//         <input
//           className="inst-search"
//           type="search"
//           placeholder="Search features, students..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </header>

//       {/* Quick Links */}
//       <nav className="inst-nav">
//         {quickLinks.map((link) => (
//           <Link to={link.url} key={link.text} className="inst-link">
//             <span className="link-icon">{link.icon}</span> {link.text}
//           </Link>
//         ))}
//       </nav>

//       {/* Main Dashboard */}
//       <main className="inst-main">
//         {/* Widgets */}
//         <section className="inst-widgets">
//           {filteredWidgets.map((widget) => (
//             <div
//               key={widget.title}
//               className="widget"
//               style={{ borderLeft: `6px solid ${widget.color}` }}
//               onClick={() => navigate(widget.link)}
//             >
//               <div className="widget-icon" style={{ color: widget.color }}>
//                 {widget.icon}
//               </div>
//               <div>
//                 <h2>{widget.title}</h2>
//                 <p className="widget-value">{widget.value}</p>
//                 <div className="widget-desc">{widget.desc}</div>
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* Recent Activity */}
//         <section className="recent-activity">
//           <h2>Recent Activity</h2>
//           <ul>
//             {recentActivity.map((item, idx) => (
//               <li key={idx}>
//                 {item.text} <span className="time">({item.time})</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// }
