import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Research.css";

export default function Research() {
  const navigate = useNavigate();
  const [researches, setResearches] = useState([]);
  const [form, setForm] = useState({
    topic: "",
    author: "",
    publishedDate: "",
    summary: ""
  });

  // Fetch research records from backend API on mount
  useEffect(() => {
    fetch("http://localhost:4000/api/research")
      .then(res => res.json())
      .then(data => setResearches(data));
  }, []);

  // Handle field changes for the form
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Add a new research record
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => setResearches(prev => [...prev, data]));
    setForm({ topic: "", author: "", publishedDate: "", summary: "" });
  };

  return (
    <div className="page-container">
      <header className="research-header">
        <h2>🔬 Research Support</h2>
        <p>Access research mentorship, funding programs, and project tracking.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>
      <main className="research-content">
        <section className="research-info">
          <h3>Ongoing Research Overview</h3>
          <ul>
            <li>Active Research Projects: {researches.length}</li>
            <li>
              Published Papers:{" "}
              {
                researches.filter(
                  item =>
                    item.summary &&
                    (item.summary.toLowerCase().includes("published") ||
                      item.summary.toLowerCase().includes("paper"))
                ).length
              }
            </li>
            <li>
              Pending Collaboration:{" "}
              {
                researches.filter(
                  item =>
                    item.summary &&
                    item.summary.toLowerCase().includes("pending")
                ).length
              }{" "}
              (Approval in Progress)
            </li>
          </ul>
        </section>
        <section className="research-list">
          <h3>Your Research Submissions</h3>
          <ul>
            {researches.length > 0 ? (
              researches.map(item => (
                <li key={item.id}>
                  <b>{item.topic}</b> by {item.author} ({item.publishedDate})
                  <br />
                  <i>{item.summary}</i>
                </li>
              ))
            ) : (
              <li>No research records yet.</li>
            )}
          </ul>
        </section>
        <section className="research-actions">
          <h3>Submit New Research</h3>
          <form onSubmit={handleSubmit} className="research-form">
            <input
              name="topic"
              placeholder="Research Topic"
              value={form.topic}
              onChange={handleChange}
              required
            />
            <input
              name="author"
              placeholder="Author Name"
              value={form.author}
              onChange={handleChange}
              required
            />
            <input
              name="publishedDate"
              placeholder="Published Date"
              type="date"
              value={form.publishedDate}
              onChange={handleChange}
              required
            />
            <input
              name="summary"
              placeholder="Summary"
              value={form.summary}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Research</button>
          </form>
        </section>
      </main>
    </div>
  );
}
