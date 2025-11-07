import React from "react";
import "./MOU.css";

export default function MOU() {
  return (
    <div className="page-container">
      <h2>Memorandum of Understanding (MOU)</h2>
      <p>View and manage signed MOUs between academic institutions and industry partners.</p>

      <div className="mou-card">
        <h4>Recent MOUs</h4>
        <ul>
          <li>IIT Delhi - Research Collaboration</li>
          <li>Google India - Internship Partnership</li>
        </ul>
      </div>
    </div>
  );
}
