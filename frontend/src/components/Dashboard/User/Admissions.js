import React from "react";
import { useNavigate } from "react-router-dom";
import "./Admissions.css";

export default function Admissions() {
  const navigate = useNavigate();
  // Static, example data
  const admissions = [
    { name: "John Doe", course: "B.Tech", date: "2025-07-10", _id: 1 },
    { name: "Akash Raj", course: "PhD", date: "2025-05-15", _id: 2 },
  ];

  return (
    <div className="admission-page">
      <header className="admission-header">
        <h1>📚 Admissions Assistance</h1>
        <p>
          Welcome to the Admissions Assistance section. Here you can view and manage your admission details.
        </p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>
      <main className="admission-content">
        <section className="admission-info">
          <h2>Available Admissions</h2>
          <ul>
            {admissions.length > 0 ? (
              admissions.map(item => (
                <li key={item._id}>
                  {item.name} — {item.course} — {item.date}
                </li>
              ))
            ) : (
              <>
                <li>Undergraduate Programs — Open</li>
                <li>Postgraduate Programs — Open</li>
                <li>Research Admissions — Coming Soon</li>
              </>
            )}
          </ul>
        </section>
        <section className="admission-actions">
          <h2>Quick Actions</h2>
          <button onClick={() => alert("View Application Form clicked")}>
            📝 View Application Form
          </button>
          <button onClick={() => alert("Check Admission Status clicked")}>
            🔍 Check Admission Status
          </button>
        </section>
      </main>
    </div>
  );
}


