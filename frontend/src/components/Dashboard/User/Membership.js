import React from "react";
import { useNavigate } from "react-router-dom";
import "./Membership.css";

export default function Membership() {
  const navigate = useNavigate();

  return (
    <div className="membership-page">
      {/* Header Section */}
      <header className="membership-header">
        <h1>💳 Membership</h1>
        <p>
          Manage your membership status and renew to continue enjoying exclusive
          Saathaihum Foundation benefits.
        </p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>

      {/* Content Section */}
      <main className="membership-content">
        <section className="membership-card">
          <h2>Status: ✅ Active</h2>
          <p>📅 Valid Until: December 2025</p>

          <button
            className="renew-btn"
            onClick={() => alert("Renew Membership clicked")}
          >
            🔁 Renew Membership
          </button>
        </section>

        <section className="membership-benefits">
          <h2>Member Benefits</h2>
          <ul>
            <li>🎓 Priority access to new academic programs</li>
            <li>🏅 Eligibility for research and excellence awards</li>
            <li>🤝 Exclusive invites to networking events</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
