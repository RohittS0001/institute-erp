import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentManagement.css";

const initialStudents = [
  { id: 1, name: "Amit Sharma", roll: "BCA2101", branch: "BCA AIML", email: "amit@institute.edu" },
  { id: 2, name: "Neha Singh", roll: "BCA2102", branch: "BCA AIML", email: "neha@institute.edu" },
  { id: 3, name: "Rahul Joshi", roll: "BCA2103", branch: "BCA AIML", email: "rahul@institute.edu" },
];

const initialBranches = ["BCA AIML", "BBA", "B.Tech CSE", "MBA"];

export default function StudentManagement() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(initialStudents);
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({ name: "", roll: "", branch: "", email: "" });

  // Branch logic
  const [branches, setBranches] = useState(initialBranches);
  const [branchModal, setBranchModal] = useState(false);
  const [newBranch, setNewBranch] = useState("");
  const [branchMessage, setBranchMessage] = useState("");

  const navigate = useNavigate();

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.roll.toLowerCase().includes(search.toLowerCase()) ||
      student.branch.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (form.name && form.roll && form.branch && form.email) {
      setStudents([
        ...students,
        {
          id: students.length + 1,
          name: form.name,
          roll: form.roll,
          branch: form.branch,
          email: form.email,
        },
      ]);
      setForm({ name: "", roll: "", branch: "", email: "" });
      setShowAdd(false);
    }
  };

  const handleAddBranch = (e) => {
    e.preventDefault();
    if (!newBranch || branches.includes(newBranch)) {
      setBranchMessage("Branch name must be unique and not empty.");
      return;
    }
    setBranches([...branches, newBranch]);
    setForm({ ...form, branch: newBranch });
    setNewBranch("");
    setBranchModal(false);
    setBranchMessage("");
  };

  return (
    <div className="student-mgmt-page">
      <div className="student-header">
        <h2>Student Management</h2>
        <div className="student-actions">
          <button className="student-btn" onClick={() => navigate("/")}>
            ← Dashboard
          </button>
          <button className="student-btn" onClick={() => setShowAdd((prev) => !prev)}>
            + Add Student
          </button>
        </div>
      </div>

      <div className="student-card">
        <div className="student-searchbar">
          <input
            className="student-search"
            type="search"
            placeholder="Search by name, roll, branch, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {showAdd && (
          <form className="add-student-form" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Student Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Roll No."
              value={form.roll}
              onChange={(e) => setForm({ ...form, roll: e.target.value })}
              required
            />
            <div className="branch-select-group">
              <select
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                required
              >
                <option value="">Select Branch</option>
                {branches.map((branch, idx) => (
                  <option key={idx} value={branch}>{branch}</option>
                ))}
              </select>
              <button
                type="button"
                className="student-btn add-branch-btn"
                onClick={() => setBranchModal(true)}
              >
                + Add Branch
              </button>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <button type="submit" className="student-btn">Add</button>
          </form>
        )}

        {/* Branch modal popup */}
        {branchModal && (
          <div className="branch-modal-overlay">
            <div className="branch-modal">
              <h4>Add New Branch</h4>
              <form onSubmit={handleAddBranch}>
                <input
                  type="text"
                  placeholder="Branch Name"
                  value={newBranch}
                  onChange={e => setNewBranch(e.target.value)}
                  required
                  autoFocus
                />
                <div className="branch-modal-btns">
                  <button className="student-btn" type="submit">Save Branch</button>
                  <button
                    className="student-btn"
                    type="button"
                    onClick={() => { setBranchModal(false); setBranchMessage(""); }}
                  >
                    Cancel
                  </button>
                </div>
                {branchMessage && (
                  <div className="branch-msg">{branchMessage}</div>
                )}
              </form>
            </div>
          </div>
        )}

        <div className="student-list-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Branch</th>
                <th>Email</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.branch}</td>
                  <td>{student.email}</td>
                  <td>{student.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
