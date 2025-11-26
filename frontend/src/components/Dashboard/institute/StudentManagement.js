import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentManagement.css";

export default function StudentManagement() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    department: "",
    email: "",
    phone: "",
    admissionYear: "",
    course: "",
  });

  // ⭐ Load all students on mount
  const loadStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/institute/students/all"
      );
      setStudents(res.data);
    } catch (err) {
      console.log("Fetch Students Error:", err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // ⭐ Add Student to MySQL Backend
  const handleAdd = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      rollNo: form.rollNo,
      department: form.department,
      email: form.email,
      phone: form.phone,
      admissionYear: Number(form.admissionYear),
      course: form.course,
    };

    try {
      await axios.post(
        "http://localhost:4000/api/institute/students/add",
        payload
      );

      await loadStudents(); // refresh table
      setShowAdd(false);

      // reset form
      setForm({
        name: "",
        rollNo: "",
        department: "",
        email: "",
        phone: "",
        admissionYear: "",
        course: "",
      });
    } catch (err) {
      console.log("Add Student Error:", err.response?.data || err);
    }
  };

  // ⭐ Search Filter
  const filtered = students.filter((s) => {
    const t = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(t) ||
      s.rollNo?.toLowerCase().includes(t) ||
      s.department?.toLowerCase().includes(t) ||
      s.email?.toLowerCase().includes(t)
    );
  });

  return (
    <div className="student-mgmt-page">
      <div className="student-header">
        <h2>Student Management</h2>

        <div className="student-actions">
          <button className="student-btn" onClick={() => navigate("/")}>
            ← Dashboard
          </button>

          <button className="student-btn" onClick={() => setShowAdd(!showAdd)}>
            + Add Student
          </button>
        </div>
      </div>

      <div className="student-card">
        {/* Search */}
        <div className="student-searchbar">
          <input
            type="search"
            className="student-search"
            placeholder="Search by name, rollNo, department, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Add Student Form */}
        {showAdd && (
          <form className="add-student-form" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Student Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Roll No."
              required
              value={form.rollNo}
              onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
            />

            {/* Department Dropdown */}
            <select
              required
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Civil">Civil</option>
              <option value="E&TC">E&TC</option>
            </select>

            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="text"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              type="number"
              placeholder="Admission Year"
              required
              value={form.admissionYear}
              onChange={(e) => setForm({ ...form, admissionYear: e.target.value })}
            />

            <input
              type="text"
              placeholder="Course (e.g. B.Tech CSE)"
              required
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            />

            <button type="submit" className="student-btn">
              Add Student
            </button>
          </form>
        )}

        {/* Table */}
        <div className="student-list-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Year</th>
                <th>Course</th>
                <th>ID</th> {/* now MySQL id */}
              </tr>
            </thead>

            <tbody>
              {filtered.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.rollNo}</td>
                  <td>{s.department}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.admissionYear}</td>
                  <td>{s.course}</td>
                  <td>{s.id}</td> {/* ← FIXED for MySQL */}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
