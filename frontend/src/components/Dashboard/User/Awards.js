import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Awards.css";

export default function Awards() {
  const navigate = useNavigate();
  const [awards, setAwards] = useState([]);
  const [form, setForm] = useState({ title: "", recipient: "", date: "" });

  // Fetch awards from the backend API
  useEffect(() => {
    fetch("http://localhost:4000/api/awards")
      .then(res => res.json())
      .then(data => setAwards(data));
  }, []);

  // Handle form field changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit new award to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/awards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => setAwards((prev) => [...prev, data]));
    setForm({ title: "", recipient: "", date: "" });
  };

  return (
    <div className="awards-page">
      <header className="awards-header">
        <h1>🏅 Awards & Recognition</h1>
        <p>
          Track your achievements, certificates, and awards received through
          academic and extracurricular excellence.
        </p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>

      <main className="awards-content">
        <section className="awards-list">
          <h2>Your Awards</h2>
          <ul>
            {awards.length > 0 ? (
              awards.map((item) => (
                <li key={item._id}>
                  🏆 {item.title} — {item.recipient} — {item.date}
                </li>
              ))
            ) : (
              <>
                <li>🏆 Best Research Paper - AI in Education</li>
                <li>🎖️ Leadership Recognition - Saathaihum Foundation</li>
                <li>⭐ 2 Awards Received in 2025</li>
              </>
            )}
          </ul>
        </section>

        <section className="awards-actions">
          <h2>Add New Award</h2>
          <form onSubmit={handleSubmit} className="awards-form">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              name="recipient"
              placeholder="Recipient"
              value={form.recipient}
              onChange={handleChange}
              required
            />
            <input
              name="date"
              placeholder="Date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Award</button>
          </form>
          <button onClick={() => alert("View Certificates clicked")}>
            📜 View Certificates
          </button>
          <button onClick={() => alert("Download Report clicked")}>
            ⬇️ Download Report
          </button>
        </section>
      </main>
    </div>
  );
}

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Awards.css";

// export default function Awards() {
//   const navigate = useNavigate();

//   return (
//     <div className="awards-page">
//       {/* Header Section */}
//       <header className="awards-header">
//         <h1>🏅 Awards & Recognition</h1>
//         <p>
//           Track your achievements, certificates, and awards received through
//           academic and extracurricular excellence.
//         </p>
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           ⬅ Back to Dashboard
//         </button>
//       </header>

//       {/* Content Section */}
//       <main className="awards-content">
//         <section className="awards-list">
//           <h2>Your Awards</h2>
//           <ul>
//             <li>🏆 Best Research Paper - AI in Education</li>
//             <li>🎖️ Leadership Recognition - Saathaihum Foundation</li>
//             <li>⭐ 2 Awards Received in 2025</li>
//           </ul>
//         </section>

//         <section className="awards-actions">
//           <h2>Quick Actions</h2>
//           <button onClick={() => alert("View Certificates clicked")}>
//             📜 View Certificates
//           </button>
//           <button onClick={() => alert("Download Report clicked")}>
//             ⬇️ Download Report
//           </button>
//         </section>
//       </main>
//     </div>
//   );
// }


// import React from "react";
// import "./Awards.css";

// export default function Awards() {
//   return (
//     <div className="page-container">
//       <h2>Awards & Recognition</h2>
//       <p>Track your achievements, certificates, and awards received through academic and extracurricular excellence.</p>
//       <ul>
//         <li>2 Awards Received in 2025</li>
//         <li>Best Research Paper - AI in Education</li>
//         <li>Leadership Recognition - Saathaihum Foundation</li>
//       </ul>
//     </div>
//   );
// }