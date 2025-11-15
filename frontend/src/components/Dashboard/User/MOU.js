import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MOU.css";

export default function MOU() {
  const navigate = useNavigate();

  // State for MOUs from backend
  const [mous, setMOUs] = useState([]);
  // State for adding new MOU
  const [form, setForm] = useState({
    title: "",
    partnerOrganization: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "active"
  });

  // Fetch MOUs from backend on mount
  useEffect(() => {
    fetch("http://localhost:4000/api/mou")
      .then(res => res.json())
      .then(setMOUs);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:4000/api/mou", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(mou => setMOUs(prev => [...prev, mou]));
    setForm({
      title: "",
      partnerOrganization: "",
      startDate: "",
      endDate: "",
      description: "",
      status: "active"
    });
  };

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
            {mous.length > 0 ? (
              mous.slice(-3).reverse().map(m => (
                <li key={m._id}>
                  {m.title} with {m.partnerOrganization} ({m.status})
                  <br/>
                  Valid: {m.startDate?.slice(0,10)} to {m.endDate ? m.endDate.slice(0,10) : "ongoing"}
                  <br/>
                  {m.description}
                </li>
              ))
            ) : (
              <>
                <li>🤝 IIT Delhi – Research Collaboration</li>
                <li>🌐 Google India – Internship Partnership</li>
                <li>🏢 Infosys – Technical Training Alliance</li>
              </>
            )}
          </ul>
        </section>

        <section className="mou-actions">
          <h2>Add / Upload New MOU</h2>
          <form onSubmit={handleSubmit} className="mou-form">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <input
              name="partnerOrganization"
              value={form.partnerOrganization}
              onChange={handleChange}
              placeholder="Partner Organization"
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
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
            <button type="submit" className="mou-btn">📤 Upload MOU</button>
          </form>
          <button className="mou-btn" onClick={() => alert("View All MOUs clicked")}>
            📘 View All MOUs
          </button>
        </section>
      </main>
    </div>
  );
}

