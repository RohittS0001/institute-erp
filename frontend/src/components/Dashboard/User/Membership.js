import React from "react";
import "./Membership.css";

export default function Membership() {
  return (
    <div className="page-container">
      <h2>Membership</h2>
      <p>View your membership status and renew for continued access to exclusive benefits.</p>

      <div className="membership-card">
        <h4>Status: Active</h4>
        <p>Valid Until: December 2025</p>
        <button className="renew-btn">Renew Membership</button>
      </div>
    </div>
  );
}