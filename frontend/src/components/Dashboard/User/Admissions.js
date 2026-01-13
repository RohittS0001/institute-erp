import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admissions.css";

export default function Admissions() {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState([]);

  // Fetch from backend on mount
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/admissions")
      .then(res => res.json())
      .then(setAdmissions);
  }, []);

  return (
    <div className="admission-page">
      <header className="admission-header">
        <h1>📚 Consulting Admissions Assistance</h1>
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
                <li key={item.id}>
                  {item.name} — {item.course} — {item.date}
                </li>
              ))
            ) : (
              <>
                <li>Undergraduate Program — Open</li>
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

        {/* NEW ONLINE ADMISSION SECTION */}
        <section className="online-admission">
          <h2>🌐 Online Admission Portal</h2>
          <div className="admission-tabs">
            <button className="tab-btn active">UG Programs</button>
            <button className="tab-btn">PG Programs</button>
          </div>
          
          <div className="admission-categories">
            <div className="category-card national">
              <h3>🇮🇳 National Students</h3>
              <ul>
                <li><strong>B.Tech CSE</strong> - ₹1,20,000/year</li>
                <li><strong>B.Sc Physics</strong> - ₹45,000/year</li>
                <li><strong>B.Com</strong> - ₹35,000/year</li>
              </ul>
              <button className="apply-btn">Apply Now</button>
            </div>
            
            <div className="category-card international">
              <h3>🌍 International Students</h3>
              <ul>
                <li><strong>B.Tech CSE</strong> - $3,500/year</li>
                <li><strong>MBA</strong> - $5,200/year</li>
                <li><strong>M.Sc Data Science</strong> - $4,000/year</li>
              </ul>
              <button className="apply-btn">Apply Now</button>
            </div>
          </div>
          
          <div className="admission-deadlines">
            <h3>⏰ Important Dates</h3>
            <div className="deadline-grid">
              <div className="deadline-item">
                <span className="deadline-label">UG Applications Close</span>
                <span className="deadline-date">15th Dec 2025</span>
              </div>
              <div className="deadline-item">
                <span className="deadline-label">PG Applications Close</span>
                <span className="deadline-date">20th Jan 2026</span>
              </div>
              <div className="deadline-item">
                <span className="deadline-label">Results Announced</span>
                <span className="deadline-date">10th Feb 2026</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}



