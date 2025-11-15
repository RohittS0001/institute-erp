import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donation.css";

export default function Donation() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({
    donor: "",
    amount: "",
    date: "",
    purpose: ""
  });

  // Fetch from backend on mount
  useEffect(() => {
    fetch("http://localhost:4000/api/donation")
      .then(res => res.json())
      .then(setDonations);
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:4000/api/donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(newDonation => setDonations(prev => [...prev, newDonation]));
    setForm({ donor: "", amount: "", date: "", purpose: "" });
  };

  return (
    <div className="donation-page">
      <header className="donation-header">
        <h1>💖 Donation</h1>
        <p>
          Support our foundation’s mission. Every contribution helps fund
          scholarships, research, and student development.
        </p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>
      <main className="donation-content">
        <section className="donation-campaigns">
          <h2>Active Campaigns</h2>
          <ul>
            <li>🎓 Scholarship Fund 2025</li>
            <li>🔬 Research Innovation Drive</li>
            <li>🌍 Community Outreach Program</li>
          </ul>
        </section>
        <section className="donation-actions">
          <h2>Make a Donation</h2>
          <form onSubmit={handleSubmit} className="donation-form">
            <input
              name="donor"
              placeholder="Donor Name"
              value={form.donor}
              onChange={handleChange}
              required
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <input
              name="purpose"
              placeholder="Purpose"
              value={form.purpose}
              onChange={handleChange}
              required
            />
            <button type="submit" className="donate-btn">
              💰 Donate
            </button>
          </form>
          <h2>Previous Donations</h2>
          <ul>
            {donations.length > 0 ? (
              donations.map(item => (
                <li key={item._id}>
                  {item.donor} donated ₹{item.amount} on {item.date} ({item.purpose})
                </li>
              ))
            ) : (
              <li>No donations recorded yet.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
