import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Attendance.css";

export default function Attendance() {
  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    role: "Student",
    date: "",
    status: "Present",
  });

  // Backend API Base URL (MySQL)
  const API = "https://backenderp-production-fe2b.up.railway.app/api/institute/attendance";

  // Load all attendance from MySQL backend
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setAttendance(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("❌ Cannot load attendance. Check backend!");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Add new attendance entry
  const handleAddAttendance = async () => {
    if (!formData.studentName || !formData.date) {
      alert("⚠ Please enter student name and date!");
      return;
    }

    try {
      await axios.post(`${API}/mark`, formData);
      alert("✅ Attendance added!");
      fetchAttendance();
      setShowAddForm(false);
      setFormData({ studentName: "", role: "Student", date: "", status: "Present" });
    } catch (error) {
      console.error("Add Error:", error);
      alert("❌ Failed to add attendance");
    }
  };

  // Update attendance status (Present/Absent)
  const handleMark = async (id, status) => {
    try {
      await axios.put(`${API}/update/${id}`, { status });
      fetchAttendance();
    } catch (error) {
      console.error("Update Error:", error);
      alert("❌ Failed to update status");
    }
  };

  // Search filter
  const filteredRows = attendance.filter(
    (row) =>
      row.studentName.toLowerCase().includes(search.toLowerCase()) ||
      row.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="attendance-page">
      <div className="header-row">
        <h2>Attendance Management</h2>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          + Add Attendance
        </button>
      </div>

      <input
        className="att-search"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Attendance Form (Popup) */}
      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Attendance</h3>

            <input
              type="text"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            />

            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />

            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleAddAttendance}>Save</button>
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Table */}
      <table className="att-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Date</th>
            <th>Status</th>
            <th>Mark</th>
          </tr>
        </thead>

        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.id}>
              <td>{row.studentName}</td>
              <td>{row.role}</td>
              <td>{row.date}</td>
              <td>{row.status}</td>

              <td>
                <button
                  onClick={() => handleMark(row.id, "Present")}
                  disabled={row.status === "Present"}
                >
                  Present
                </button>

                <button
                  onClick={() => handleMark(row.id, "Absent")}
                  disabled={row.status === "Absent"}
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
