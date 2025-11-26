import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notifications.css";

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // ⭐ Fetch Notifications (MySQL-compatible)
  const loadNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/institute/notifications/all"
      );
      setNotifications(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // ⭐ Add Notification (MySQL-compatible)
  const handleAdd = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      message,
      date: new Date().toLocaleString(),
      target: "All",
    };

    try {
      await axios.post(
        "http://localhost:4000/api/institute/notifications/send",
        payload
      );

      await loadNotifications();

      setTitle("");
      setMessage("");
      setShowAdd(false);

    } catch (err) {
      console.log("Add error:", err);
    }
  };

  return (
    <div className="notif-page">

      <div className="notif-header">
        <h2>Notifications</h2>

        <div>
          <button className="notif-btn" onClick={() => navigate("/dashboard/institute")}>
            ← Dashboard
          </button>

          <button className="notif-btn" onClick={() => setShowAdd(!showAdd)}>
            + Add Notification
          </button>
        </div>
      </div>

      {showAdd && (
        <form className="notif-add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Message"
            required
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" className="notif-btn">Add</button>
        </form>
      )}

      <div className="notif-list">

        {notifications.length === 0 && (
          <div className="notif-empty">No notifications yet.</div>
        )}

        {notifications.map((notif) => (
          <div className="notif-card" key={notif.id}>

            <div className="notif-title">{notif.title}</div>
            <div className="notif-msg">{notif.message}</div>

            <div className="notif-time">
              {notif.date ? notif.date : "No date"}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
