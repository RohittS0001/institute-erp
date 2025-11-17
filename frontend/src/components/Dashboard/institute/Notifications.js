import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch notifications from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/notifications")
      .then(res => setNotifications(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/notifications", {
      title,
      message
    }).then(res => {
      setNotifications([res.data, ...notifications]);
      setTitle("");
      setMessage("");
      setShowAdd(false);
    }).catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/notifications/${id}`)
      .then(() => {
        setNotifications(notifications.filter(n => n._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="notif-page">
      <div className="notif-header">
        <h2>Notifications</h2>
        <div>
          <button className="notif-btn" onClick={() => navigate("/dashboard/institute")}>
            ← Dashboard
          </button>
          <button className="notif-btn" onClick={() => setShowAdd(prev => !prev)}>
            + Add Notification
          </button>
        </div>
      </div>

      {showAdd && (
        <form className="notif-add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            required
          />

          <button className="notif-btn" type="submit">Add</button>
        </form>
      )}

      <div className="notif-list">
        {notifications.length === 0 && (
          <div className="notif-empty">No notifications yet.</div>
        )}

        {notifications.map((notif) => (
          <div className="notif-card" key={notif._id}>
            <div className="notif-title">{notif.title}</div>
            <div className="notif-msg">{notif.message}</div>
            <div className="notif-time">{notif.time}</div>

            <button className="notif-delete" onClick={() => handleDelete(notif._id)}>
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Notifications.css";

// const initialNotifications = [
//   { id: 1, title: "Placement Drive Announcement", message: "New placement opportunities announced for BCA students. Check details in Events.", time: "2025-11-14 14:10" },
//   { id: 2, title: "AI Workshop Registration", message: "Register for our upcoming AI workshop before the deadline.", time: "2025-11-13 11:20" },
//   { id: 3, title: "New Holiday", message: "Institute will remain closed on 16th Nov for Diwali.", time: "2025-11-11 17:50" },
// ];

// export default function Notifications() {
//   const [notifications, setNotifications] = useState(initialNotifications);
//   const [showAdd, setShowAdd] = useState(false);
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleAdd = (e) => {
//     e.preventDefault();
//     if (title && message) {
//       setNotifications([
//         { id: notifications.length + 1, title, message, time: new Date().toLocaleString("en-IN") },
//         ...notifications
//       ]);
//       setTitle("");
//       setMessage("");
//       setShowAdd(false);
//     }
//   };

//   return (
//     <div className="notif-page">
//       <div className="notif-header">
//         <h2>Notifications</h2>
//         <div>
//           <button className="notif-btn" onClick={() => navigate("/")}>
//             ← Dashboard
//           </button>
//           <button className="notif-btn" onClick={() => setShowAdd((prev) => !prev)}>
//             + Add Notification
//           </button>
//         </div>
//       </div>

//       {showAdd && (
//         <form className="notif-add-form" onSubmit={handleAdd}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Message"
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//             rows={2}
//             required
//           />
//           <button className="notif-btn" type="submit">Add</button>
//         </form>
//       )}

//       <div className="notif-list">
//         {notifications.length === 0 && (
//           <div className="notif-empty">No notifications yet.</div>
//         )}
//         {notifications.map(notif => (
//           <div className="notif-card" key={notif.id}>
//             <div className="notif-title">{notif.title}</div>
//             <div className="notif-msg">{notif.message}</div>
//             <div className="notif-time">{notif.time}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
