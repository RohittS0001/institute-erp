import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Placements.css";

const Placements = () => {
  const [search, setSearch] = useState("");
  const [placements, setPlacements] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlacement, setNewPlacement] = useState({
    studentName: "",
    companyName: "",
    position: "",
    status: "Pending",
    salary: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);
  const [editPlacement, setEditPlacement] = useState({
    studentName: "",
    companyName: "",
    position: "",
    status: "Pending",
    salary: "",
    date: "",
  });

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await axios.get("https://backenderp-production-6374.up.railway.app/api/admin/placements");
        setPlacements(response.data);
      } catch (error) {
        console.error("Error fetching placements:", error);
        setPlacements([]);
      }
    };
    fetchPlacements();
  }, []);

  const filtered = placements.filter(
    (place) =>
      place.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      place.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      place.position?.toLowerCase().includes(search.toLowerCase()) ||
      place.status?.toLowerCase().includes(search.toLowerCase()) ||
      place.salary?.toString().includes(search) ||
      place.date?.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlacement((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlacement = async (e) => {
    e.preventDefault();
    if (!newPlacement.studentName.trim() || !newPlacement.companyName.trim()) {
      alert("Student Name and Company Name are required");
      return;
    }
    try {
      const response = await axios.post("https://backenderp-production-6374.up.railway.app/api/admin/placements", newPlacement);
      setPlacements((prev) => [...prev, response.data]);
      setNewPlacement({
        studentName: "",
        companyName: "",
        position: "",
        status: "Pending",
        salary: "",
        date: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add placement:", error);
      alert("Failed to add placement. Please try again.");
    }
  };

  const handleDeletePlacement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this placement?")) return;
    try {
      await axios.delete(`https://backenderp-production-6374.up.railway.app/api/admin/placements/${id}`);
      setPlacements((prev) => prev.filter((place) => place.id !== id));
    } catch (error) {
      console.error("Failed to delete placement:", error);
      alert("Failed to delete placement. Please try again.");
    }
  };

  const handleEdit = (place) => {
    setEditId(place.id);
    setEditPlacement({
      studentName: place.studentName || "",
      companyName: place.companyName || "",
      position: place.position || "",
      status: place.status || "Pending",
      salary: place.salary || "",
      date: place.date || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPlacement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `https://backenderp-production-6374.up.railway.app/api/admin/placements/${id}`,
        editPlacement
      );
      setPlacements((prev) =>
        prev.map((place) => (place.id === id ? response.data : place))
      );
      setEditId(null);
    } catch (error) {
      console.error("Failed to update placement:", error);
      alert("Failed to update placement. Please try again.");
    }
  };

  const toggleForm = () => setShowAddForm((prev) => !prev);
  const cancelEdit = () => setEditId(null);

  return (
    <div className="imm-admin-page">
      <h1>Placements Management</h1>
      
      <div className="imm-admin-header">
        <input
          type="search"
          placeholder="Search Placements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="imm-admin-search"
        />
        <button onClick={toggleForm} className="imm-admin-add-btn">
          {showAddForm ? "Close Form" : "Add New Placement"}
        </button>
      </div>

      {showAddForm && (
        <div className="imm-admin-section">
          <form onSubmit={handleAddPlacement} className="imm-admin-add-form">
            <input
              name="studentName"
              placeholder="Student Name *"
              value={newPlacement.studentName}
              onChange={handleChange}
              required
              className="imm-admin-input"
            />
            <input
              name="companyName"
              placeholder="Company Name *"
              value={newPlacement.companyName}
              onChange={handleChange}
              required
              className="imm-admin-input"
            />
            <input
              name="position"
              placeholder="Position"
              value={newPlacement.position}
              onChange={handleChange}
              className="imm-admin-input"
            />
            <select 
              name="status" 
              value={newPlacement.status} 
              onChange={handleChange}
              className="imm-admin-input"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input
              name="salary"
              placeholder="Salary"
              value={newPlacement.salary}
              onChange={handleChange}
              className="imm-admin-input"
            />
            <input
              name="date"
              type="date"
              value={newPlacement.date}
              onChange={handleChange}
              className="imm-admin-input"
            />
            <button type="submit" className="imm-admin-submit-btn">
              Save Placement
            </button>
          </form>
        </div>
      )}

      <div className="imm-admin-table-wrapper">
        <table className="imm-admin-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Salary</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((place) =>
                editId === place.id ? (
                  <tr key={place.id}>
                    <td><input name="studentName" value={editPlacement.studentName} onChange={handleEditChange} required className="imm-admin-edit-input" /></td>
                    <td><input name="companyName" value={editPlacement.companyName} onChange={handleEditChange} required className="imm-admin-edit-input" /></td>
                    <td><input name="position" value={editPlacement.position} onChange={handleEditChange} className="imm-admin-edit-input" /></td>
                    <td>
                      <select name="status" value={editPlacement.status} onChange={handleEditChange} className="imm-admin-edit-select">
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td><input name="salary" value={editPlacement.salary} onChange={handleEditChange} className="imm-admin-edit-input" /></td>
                    <td><input name="date" type="date" value={editPlacement.date} onChange={handleEditChange} className="imm-admin-edit-input" /></td>
                    <td>
                      <button className="imm-admin-save-btn" onClick={() => handleSave(place.id)}>Save</button>
                      <button className="imm-admin-cancel-btn" onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={place.id}>
                    <td>{place.studentName}</td>
                    <td>{place.companyName}</td>
                    <td>{place.position}</td>
                    <td>
                      <span className={`imm-admin-status imm-admin-status-${place.status.toLowerCase()}`}>
                        {place.status}
                      </span>
                    </td>
                    <td>{place.salary}</td>
                    <td>{place.date}</td>
                    <td>
                      <button className="imm-admin-edit-btn" onClick={() => handleEdit(place)}>Edit</button>
                      <button className="imm-admin-delete-btn" onClick={() => handleDeletePlacement(place.id)}>Delete</button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No placements found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Placements;
