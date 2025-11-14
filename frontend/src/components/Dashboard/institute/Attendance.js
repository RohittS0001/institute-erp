import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Attendance.css";

const initialAttendance = [
  { id: 1, name: "Amit Sharma", role: "Student", date: "2025-11-14", status: "Present" },
  { id: 2, name: "Neha Singh", role: "Student", date: "2025-11-14", status: "Absent" },
  { id: 3, name: "Dr. Mehta", role: "Faculty", date: "2025-11-14", status: "Present" },
  { id: 4, name: "Rahul Joshi", role: "Student", date: "2025-11-14", status: "Present" },
];

export default function Attendance() {
  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState(initialAttendance);
  const navigate = useNavigate();

  const filteredRows = attendance.filter(
    (row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.role.toLowerCase().includes(search.toLowerCase())
  );

  // Mark Present/Absent
  const handleMark = (id, newStatus) => {
    setAttendance(attendance.map(row =>
      row.id === id ? { ...row, status: newStatus } : row
    ));
  };

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h2>Attendance Management</h2>
        <button className="attendance-btn" onClick={() => navigate("/")}>
          ← Dashboard
        </button>
      </div>
      <div className="att-topbar">
        <input
          className="att-search"
          type="search"
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
            <tr key={row.id} className={row.status === "Absent" ? "absent" : ""}>
              <td>{row.name}</td>
              <td>{row.role}</td>
              <td>{row.date}</td>
              <td>
                <span
                  className={
                    row.status === "Present"
                      ? "status-present"
                      : "status-absent"
                  }
                >
                  {row.status}
                </span>
              </td>
              <td>
                <button
                  className="attendance-btn"
                  onClick={() => handleMark(row.id, "Present")}
                  disabled={row.status === "Present"}
                >
                  Present
                </button>
                <button
                  className="attendance-btn"
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
