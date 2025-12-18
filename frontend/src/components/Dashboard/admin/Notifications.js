import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notifications.css";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("https://backenderp-production-6374.up.railway.app/api/admin/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      }
    };
    fetchNotifications();
  }, []);

  const toggleReadStatus = async (id) => {
    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
    // Persist change to backend
    try {
      await axios.put(`https://backenderp-production-6374.up.railway.app/api/admin/notifications/${id}/toggle-read`);
    } catch (error) {
      console.error("Failed to update read status:", error);
      // Optionally revert UI change or refetch notifications here
    }
  };

  return (
    <div className="page-content">
      <h1>System Notifications</h1>
      <ul className="notifications-list">
        {notifications.length === 0 ? (
          <li className="no-notifications">No notifications</li>
        ) : (
          notifications.map(({ id, type, message, date, read }) => (
            <li
              key={id}
              className={`notification-item ${read ? "read" : "unread"}`}
              onClick={() => toggleReadStatus(id)}
            >
              <div className="notif-type">{type}</div>
              <div className="notif-message">{message}</div>
              <div className="notif-date">{formatDate(date)}</div>
              <button className="mark-read-btn">
                {read ? "Mark Unread" : "Mark Read"}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;
