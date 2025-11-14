import React from "react";
import { useNavigate } from "react-router-dom";
import "./MOU.css";

export default function MOU() {
  const navigate = useNavigate();

  return (
    <div className="mou-page">
      {/* Header Section */}
      <header className="mou-header">
        <h1>📄 Memorandum of Understanding (MOU)</h1>
        <p>
          View and manage signed MOUs between academic institutions and
          industry partners.
        </p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>

      {/* Content Section */}
      <main className="mou-content">
        <section className="mou-card">
          <h2>Recent MOUs</h2>
          <ul>
            <li>🤝 IIT Delhi – Research Collaboration</li>
            <li>🌐 Google India – Internship Partnership</li>
            <li>🏢 Infosys – Technical Training Alliance</li>
          </ul>
        </section>

        <section className="mou-actions">
          <h2>Quick Actions</h2>
          <button
            className="mou-btn"
            onClick={() => alert("View All MOUs clicked")}
          >
            📘 View All MOUs
          </button>
          <button
            className="mou-btn"
            onClick={() => alert("Upload New MOU clicked")}
          >
            📤 Upload New MOU
          </button>
        </section>
      </main>
    </div>
  );
}
