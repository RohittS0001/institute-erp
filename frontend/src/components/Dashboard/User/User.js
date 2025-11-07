import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";

const widgetsData = [
  { title: "Admissions Assistance", value: 4, icon: "📚", color: "#36b9cc", link: "/dashboard/user/admissions" },
  { title: "Awards & Recognition", value: 2, icon: "🏅", color: "#4e73df", link: "/dashboard/user/awards" },
  { title: "Research Support", value: 3, icon: "🧠", color: "#1cc88a", link: "/dashboard/user/research" },
  { title: "Academic–Industry Immersion", value: "92%", icon: "📊", color: "#f6c23e", link: "/dashboard/user/immersion" },
  { title: "Placement Support", value: 3, icon: "🎓", color: "#1c3ec8", link: "/dashboard/user/placement" },
];

const quickLinks = [
  { url: "/dashboard/user/profile", text: "My Profile", icon: "👤" },
  { url: "/dashboard/user/donation", text: "Donation", icon: "💰" },
  { url: "/dashboard/user/mou", text: "MOU", icon: "📄" },
  { url: "/dashboard/user/membership", text: "Membership", icon: "💳" },
];

const recentActivity = [
  { text: "Upcoming Placement Drive", time: "In 1 day" },
  { text: "Membership Expiring Soon", time: "In 2 days" },
  { text: "Attended Research Seminar", time: "Today" },
  { text: "New Notice from Institute", time: "Just now" },
];

export default function User() {
  const [search, setSearch] = useState("");

  return (
    <div className="user-dashboard">
      {/* Header */}
      <header className="user-header">
        <div>
          <h1>🎓 User Dashboard</h1>
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

      {/* Quick Links */}
      <nav className="user-nav">
        {quickLinks.map((link) => (
          <Link to={link.url} key={link.text} className="user-link">
            <span className="link-icon">{link.icon}</span> {link.text}
          </Link>
        ))}
      </nav>

      {/* Main Dashboard */}
      <main className="user-main">
        {/* Widgets */}
        <section className="dashboard-widgets">
          {widgetsData.map((widget) => (
            <Link
              to={widget.link}
              className="widget"
              style={{ borderLeft: `6px solid ${widget.color}` }}
              key={widget.title}
            >
              <div className="widget-icon" style={{ color: widget.color }}>
                {widget.icon}
              </div>
              <div>
                <h2>{widget.title}</h2>
                <p>{widget.value}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* Recent Activity */}
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
}






// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./User.css";

// const widgetsData = [
//   { title: "Admissions Assistance", value: 4, icon: "📚", color: "#36b9cc", link: "/dashboard/user/admissions" },
//   { title: "Awards & Recognition", value: 2, icon: "🏆", color: "#4e73df", link: "/dashboard/user/awards" },
//   { title: "Research Support", value: 3, icon: "🔬", color: "#1cc88a", link: "/dashboard/user/research" },
//   { title: "Academic–Industry Immersion", value: "92%", icon: "📊", color: "#f6c23e", link: "/dashboard/user/immersion" },
//   { title: "Placement Support", value: 3, icon: "🎓", color: "#1c3ec8", link: "/dashboard/user/placement" },
// ];

// const quickLinks = [
//   { url: "#", text: "My Profile" },
//   { url: "#", text: "Donation" },
//   { url: "#", text: "MOU" },
//   { url: "#", text: "Membership" },
// ];

// const recentActivity = [
//   { text: "Upcoming Placement", time: "In 1 hour" },
//   { text: "Membership", time: "Expires in 2 days" },
//   { text: "Attended Webinar", time: "Today" },
//   { text: "New Notice from Institute", time: "Just now" },
// ];

// export default function UserDashboard() {
//   const [search, setSearch] = useState("");

//   return (
//     <div className="user-dashboard">
//       {/* Header Section */}
//       <header className="user-header">
//         <div>
//           <h1>🎓 User Dashboard</h1>
//           <p className="user-sub">Welcome to Saathaihum Foundation, Student!</p>
//         </div>
//         <input
//           className="user-search"
//           type="search"
//           placeholder="Search courses, tasks..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </header>

//       {/* Quick Links */}
//       <nav className="user-nav">
//         {quickLinks.map((link) => (
//           <a href={link.url} key={link.text}>
//             {link.text}
//           </a>
//         ))}
//       </nav>

//       {/* Dashboard Main Content */}
//       <main className="user-main">
//         {/* Widgets Section */}
//         <section className="dashboard-widgets">
//           {widgetsData.map((widget) => (
//             <Link
//               to={widget.link}
//               key={widget.title}
//               className="widget"
//               style={{ borderLeft: `6px solid ${widget.color}` }}
//             >
//               <div className="widget-icon" style={{ color: widget.color }}>
//                 {widget.icon}
//               </div>
//               <div>
//                 <h2>{widget.title}</h2>
//                 <p>{widget.value}</p>
//               </div>
//             </Link>
//           ))}
//         </section>

//         {/* Recent Activity Section */}
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
