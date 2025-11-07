import React, { useState } from "react";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    type: "User Request",
    message: "New user registration pending approval.",
    date: "2025-11-07T09:30:00",
    read: false,
  },
  {
    id: 2,
    type: "System Alert",
    message: "Scheduled maintenance on Nov 15.",
    date: "2025-11-05T10:00:00",
    read: true,
  },
  {
    id: 3,
    type: "Approval",
    message: "New course approval granted.",
    date: "2025-11-04T14:20:00",
    read: false,
  },
];

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric", hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };

  return (
    <div className="page-content">
      <h1>System Notifications</h1>
      <ul className="notifications-list">
        {notifications.length === 0 ? (
          <li className="no-notifications">No notifications</li>
        ) : (
          notifications.map(({ id, type, message, date, read }) => (
            <li key={id} className={`notification-item ${read ? 'read' : 'unread'}`} onClick={() => toggleReadStatus(id)}>
              <div className="notif-type">{type}</div>
              <div className="notif-message">{message}</div>
              <div className="notif-date">{formatDate(date)}</div>
              <button className="mark-read-btn">{read ? "Mark Unread" : "Mark Read"}</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;
