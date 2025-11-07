import React from "react";
import "./Donation.css";

export default function Donation() {
  return (
    <div className="page-container">
      <h2>Donation</h2>
      <p>Support our foundation’s mission. Every contribution helps fund scholarships and student development.</p>

      <div className="donation-card">
        <h4>Active Campaigns</h4>
        <ul>
          <li>Scholarship Fund 2025</li>
          <li>Research Innovation Drive</li>
        </ul>
        <button className="donate-btn">Make a Donation</button>
      </div>
    </div>
  );
}