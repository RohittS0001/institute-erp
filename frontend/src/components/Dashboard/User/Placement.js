import React from "react";
import { useNavigate } from "react-router-dom";
import "./Placement.css";

export default function Placement() {
  const navigate = useNavigate();

  return (
    <div className="placement-page">
      {/* Header Section */}
      <header className="placement-header">
        <h1>🎓 Placement Support</h1>
        <p>
          Get assistance with interview preparation, job listings, and company
          connections.
        </p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>

      {/* Content Section */}
      <main className="placement-content">
        <section className="placement-info">
          <h2>Current Updates</h2>
          <ul>
            <li>✅ 3 Companies Shortlisted</li>
            <li>🕒 Next Interview: Tomorrow, 11:00 AM</li>
            <li>👨‍💼 Placement Coordinator: Mr. Rajesh Singh</li>
          </ul>
        </section>

        <section className="placement-actions">
          <h2>Quick Actions</h2>
          <button
            className="placement-btn"
            onClick={() => alert("View Job Listings clicked")}
          >
            💼 View Job Listings
          </button>
          <button
            className="placement-btn"
            onClick={() => alert("Check Interview Schedule clicked")}
          >
            📅 Check Interview Schedule
          </button>
          <button
            className="placement-btn"
            onClick={() => alert("Get Resume Assistance clicked")}
          >
            🧾 Get Resume Assistance
          </button>
        </section>
      </main>
    </div>
  );
}
