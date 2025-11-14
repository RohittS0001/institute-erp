import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Immersion.css";

export default function Immersion() {
  const navigate = useNavigate();
  const [immersions, setImmersions] = useState([
    {
      program: "Data Analytics Training",
      institution: "DeltaX Labs",
      startDate: "2025-07-01",
      endDate: "2025-11-19",
      description: "A project-focused immersion in modern analytics.",
      _id: 1
    }
  ]);
  const [form, setForm] = useState({
    program: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setImmersions(prev => [
      ...prev,
      { ...form, _id: Date.now() }
    ]);
    setForm({
      program: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

  return (
    <div className="immersion-page">
      <header className="immersion-header">
        <h1>🏭 Academic–Industry Immersion</h1>
        <p>
          Track your internships, industrial training, and professional exposure programs here.
        </p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>
      <main className="immersion-content">
        <section className="immersion-progress">
          <h2>Current Immersion Status</h2>
          <ul>
            {immersions.length > 0 ? (
              immersions.map(item => (
                <li key={item._id}>
                  <strong>{item.program}</strong> at {item.institution} from{" "}
                  {item.startDate} to {item.endDate}
                  <br />
                  {item.description}
                </li>
              ))
            ) : (
              <>
                <li>📊 92% Completion</li>
                <li>🧠 Ongoing Project: Data Analytics at DeltaX Labs</li>
                <li>📅 Final Report Due: 20 Nov 2025</li>
              </>
            )}
          </ul>
        </section>
        <section className="immersion-actions">
          <h2>Quick Actions</h2>
          <form onSubmit={handleSubmit} className="immersion-form">
            <input
              name="program"
              placeholder="Program Name"
              value={form.program}
              onChange={handleChange}
              required
            />
            <input
              name="institution"
              placeholder="Institution Name"
              value={form.institution}
              onChange={handleChange}
              required
            />
            <input
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <input
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Immersion</button>
          </form>
          <button
            onClick={() => alert("Upload Report clicked")}
            className="immersion-btn"
          >
            📤 Upload Report
          </button>
          <button
            onClick={() => alert("View Mentor Feedback clicked")}
            className="immersion-btn secondary"
          >
            🧾 View Mentor Feedback
          </button>
        </section>
      </main>
    </div>
  );
}


