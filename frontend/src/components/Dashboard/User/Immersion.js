import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Immersion.css";

export default function Immersion() {
  const navigate = useNavigate();
  const [immersions, setImmersions] = useState([]);
  const [form, setForm] = useState({
    program: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  // Fetch from backend on mount
  useEffect(() => {
    fetch("https://backenderp-production-fe2b.up.railway.app/api/immersion")
      .then(res => res.json())
      .then(setImmersions);
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://backenderp-production-fe2b.up.railway.app/api/immersion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newImmersion =>
        setImmersions(prev => [...prev, newImmersion])
      );
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
        <div className="immersion-header-top">
          <h1>🏭 Academic–Industry Immersion</h1>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back to Dashboard
          </button>
        </div>
        <p>
          Track your internships, industrial training, and professional exposure
          programs here.
        </p>

        {/* New Academic / Industry Fee Info */}
        <div className="immersion-fee-strip">
          <div className="fee-card academic">
            <h3>Academic Immersion</h3>
            <div className="fee-row">
              <span>Indian Students</span>
              <strong>₹ 2,000</strong>
            </div>
            <div className="fee-row">
              <span>Non‑Indian Students</span>
              <strong>$ 29</strong>
            </div>
          </div>

          <div className="fee-card industry">
            <h3>Industry Immersion</h3>
            <div className="fee-row">
              <span>Indian Students</span>
              <strong>₹ 999</strong>
            </div>
            <div className="fee-row">
              <span>Non‑Indian Students</span>
              <strong>$ 20</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="immersion-content">
        <section className="immersion-progress">
          <h2>Current Immersion Status</h2>
          <ul>
            {immersions.length > 0 ? (
              immersions.map(item => (
                <li key={item.id}>
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
