import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Faculty.css";

const initialFaculty = [
  { id: 1, name: "Dr. Mehta", department: "AI/ML", email: "mehta@institute.edu" },
  { id: 2, name: "Ms. Sharma", department: "CS", email: "sharma@institute.edu" },
  { id: 3, name: "Dr. Patel", department: "AI/ML", email: "patel@institute.edu" }
];

export default function Faculty() {
  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState(initialFaculty);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", department: "", email: "" });
  const navigate = useNavigate();

  const filteredFaculty = faculty.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.department.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (form.name && form.department && form.email) {
      setFaculty([
        ...faculty,
        {
          id: faculty.length + 1,
          name: form.name,
          department: form.department,
          email: form.email,
        },
      ]);
      setForm({ name: "", department: "", email: "" });
      setShowAdd(false);
    }
  };

  return (
    <div className="faculty-page">
      <div className="faculty-header">
        <h2>Faculty Management</h2>
        <div className="faculty-actions">
          <button className="faculty-btn" onClick={() => navigate("/")}>
            ← Dashboard
          </button>
          <button className="faculty-btn" onClick={() => setShowAdd((prev) => !prev)}>
            + Add Faculty
          </button>
        </div>
      </div>

      {showAdd && (
        <form className="add-faculty-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Faculty Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <button type="submit" className="faculty-btn">Add</button>
        </form>
      )}

      <div className="faculty-topbar">
        <input
          className="faculty-search"
          type="search"
          placeholder="Search by name, department, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="faculty-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaculty.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.department}</td>
              <td>{member.email}</td>
              <td>{member.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
