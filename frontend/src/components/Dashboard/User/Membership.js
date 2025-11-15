import React, { useState, useEffect } from "react";
import "./Membership.css";

export default function Membership() {
  const [memberships, setMemberships] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    organization: "",
    membershipType: "",
    startDate: "",
    endDate: "",
    status: "active"
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/membership")
      .then(res => res.json())
      .then(setMemberships);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:4000/api/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(membership => setMemberships(prev => [...prev, membership]));
    setForm({
      userId: "",
      organization: "",
      membershipType: "",
      startDate: "",
      endDate: "",
      status: "active"
    });
  };

  return (
    <div>
      <h2>Memberships</h2>
      <ul>
        {memberships.map(m => (
          <li key={m._id}>
            User: {typeof m.userId === "object" ? m.userId.name : m.userId} | {m.organization} | {m.membershipType} | {m.status}
          </li>
        ))}
      </ul>
      <h3>Add New Membership</h3>
      <form onSubmit={handleSubmit}>
        <input name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" required />
        <input name="organization" value={form.organization} onChange={handleChange} placeholder="Organization" required />
        <input name="membershipType" value={form.membershipType} onChange={handleChange} placeholder="Membership Type" required />
        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="pending">Pending</option>
        </select>
        <button type="submit">Add Membership</button>
      </form>
    </div>
  );
}
