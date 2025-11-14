import React from "react";
import { Routes, Route } from "react-router-dom";

import Admissions from "./Admissions";
import Awards from "./Awards";
import Research from "./Research";
import Immersion from "./Immersion";
import Placement from "./Placement";
import Profile from "./Profile";
import Donation from "./Donation";
import MOU from "./MOU";
import Membership from "./Membership";
import UserDashboard from "./UserDashboard"; // <-- Correct import here!

import "./User.css";

const User = () => {
  return (
    <div className="user-dashboard-wrapper">
      <main className="user-dashboard-content">
        <Routes>
          <Route index element={<UserDashboard />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="awards" element={<Awards />} />
          <Route path="research" element={<Research />} />
          <Route path="immersion" element={<Immersion />} />
          <Route path="placement" element={<Placement />} />
          <Route path="profile" element={<Profile />} />
          <Route path="donation" element={<Donation />} />
          <Route path="mou" element={<MOU />} />
          <Route path="membership" element={<Membership />} />
        </Routes>
      </main>
    </div>
  );
};

export default User;


// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Import all user subpages
// import Admissions from "./Admissions";
// import Awards from "./Awards";
// import Research from "./Research";
// import Immersion from "./Immersion";
// import Placement from "./Placement";
// import Profile from "./Profile";
// import Donation from "./Donation";
// import MOU from "./MOU";
// import Membership from "./Membership";

// // Import your main User dashboard widget (the one with widgetsData, quickLinks, etc.)
// // Rename this to UserDashboard if you want for clarity
// import UserDashboard from "./User";

// import "./User.css";

// const User = () => {
//   return (
//     <div className="user-dashboard-wrapper">
//       {/* Optional: User sidebar/nav here */}
//       <main className="user-dashboard-content">
//         <Routes>
//           <Route index element={<UserDashboard />} />
//           <Route path="admissions" element={<Admissions />} />
//           <Route path="awards" element={<Awards />} />
//           <Route path="research" element={<Research />} />
//           <Route path="immersion" element={<Immersion />} />
//           <Route path="placement" element={<Placement />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="donation" element={<Donation />} />
//           <Route path="mou" element={<MOU />} />
//           <Route path="membership" element={<Membership />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default User;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./User.css";

// // --- Dashboard Data ---
// const widgetsData = [
//   { title: "Admissions Assistance", value: 4, icon: "📚", color: "#36b9cc", link: "/dashboard/user/admissions" },
//   { title: "Awards & Recognition", value: 2, icon: "🏅", color: "#4e73df", link: "/dashboard/user/awards" },
//   { title: "Research Support", value: 3, icon: "🧠", color: "#1cc88a", link: "/dashboard/user/research" },
//   { title: "Academic–Industry Immersion", value: "92%", icon: "📊", color: "#f6c23e", link: "/dashboard/user/immersion" },
//   { title: "Placement Support", value: 3, icon: "🎓", color: "#1c3ec8", link: "/dashboard/user/placement" },
// ];

// const quickLinks = [
//   { url: "/dashboard/user/profile", text: "My Profile", icon: "👤" },
//   { url: "/dashboard/user/donation", text: "Donation", icon: "💰" },
//   { url: "/dashboard/user/mou", text: "MOU", icon: "📄" },
//   { url: "/dashboard/user/membership", text: "Membership", icon: "💳" },
// ];

// const recentActivity = [
//   { text: "Upcoming Placement Drive", time: "In 1 day" },
//   { text: "Membership Expiring Soon", time: "In 2 days" },
//   { text: "Attended Research Seminar", time: "Today" },
//   { text: "New Notice from Institute", time: "Just now" },
// ];

// // --- Main Component ---
// export default function User() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // You can clear local storage or tokens here if needed
//     // localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="user-dashboard">
//       {/* Header */}
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
//           <Link to={link.url} key={link.text} className="user-link">
//             <span className="link-icon">{link.icon}</span> {link.text}
//           </Link>
//         ))}
//       </nav>

//       {/* Main Dashboard */}
//       <main className="user-main">
//         {/* Widgets */}
//         <section className="dashboard-widgets">
//           {widgetsData.map((widget) => (
//             <div
//               key={widget.title}
//               className="widget"
//               style={{ borderLeft: `6px solid ${widget.color}`, cursor: "pointer" }}
//               onClick={() => navigate(widget.link)}
//             >
//               <div className="widget-icon" style={{ color: widget.color }}>
//                 {widget.icon}
//               </div>
//               <div>
//                 <h2>{widget.title}</h2>
//                 <p>{widget.value}</p>
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

//       {/* Logout Button */}
//       <button className="logout-btn" onClick={handleLogout}>
//         🚪 Logout
//       </button>
//     </div>
//   );
// }



