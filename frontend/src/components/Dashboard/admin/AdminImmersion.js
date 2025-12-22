import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminImmersion.css";

const AdminImmersion = () => {
  const [immersions, setImmersions] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [newImmersion, setNewImmersion] = useState({
    program: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);
  const [editImmersion, setEditImmersion] = useState({
    program: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    const fetchImmersions = async () => {
      try {
        const response = await axios.get(
          "https://backenderp-production-6374.up.railway.app/api/immersion"
        );
        setImmersions(response.data || []);
      } catch (error) {
        console.error("Error fetching immersions:", error);
        setImmersions([]);
      }
    };
    fetchImmersions();
  }, []);

  const filteredImmersions = immersions.filter(
    (item) =>
      item.program?.toLowerCase().includes(search.toLowerCase()) ||
      item.institution?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewImmersion((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditImmersion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImmersion = async (e) => {
    e.preventDefault();
    if (!newImmersion.program.trim() || !newImmersion.institution.trim()) {
      alert("Program and Institution are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://backenderp-production-6374.up.railway.app/api/immersion",
        newImmersion
      );
      setImmersions((prev) => [...prev, response.data]);
      setNewImmersion({
        program: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add immersion:", error);
      alert("Failed to add immersion. Please try again.");
    }
  };

  const handleDeleteImmersion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(
        `https://backenderp-production-6374.up.railway.app/api/immersion/${id}`
      );
      setImmersions((prev) => prev.filter((item) => item.id !== id && item._id !== id));
    } catch (error) {
      console.error("Failed to delete immersion:", error);
      alert("Failed to delete immersion. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id || item._id);
    setEditImmersion({
      program: item.program,
      institution: item.institution,
      startDate: item.startDate,
      endDate: item.endDate,
      description: item.description,
    });
  };

  const handleEditSave = async (id) => {
    try {
      const response = await axios.put(
        `https://backenderp-production-6374.up.railway.app/api/immersion/${id}`,
        editImmersion
      );
      const updated = response.data;

      setImmersions((prev) =>
        prev.map((item) =>
          (item.id || item._id) === id ? updated : item
        )
      );
      setEditId(null);
    } catch (error) {
      console.error("Failed to update immersion:", error);
      alert("Failed to update immersion. Please try again.");
    }
  };

  const toggleForm = () => setShowAddForm((prev) => !prev);

  return (
    <div className="immersion-page-content">
      <h1>Immersion Management</h1>

      <div className="immersion-header-top">
        <input
          type="search"
          className="immersion-search"
          placeholder="Search by program, institution, description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={toggleForm} className="immersion-add-btn">
          {showAddForm ? "Close Form" : "Add New Immersion"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddImmersion} className="immersion-add-form">
          <input
            name="program"
            placeholder="Program Name"
            value={newImmersion.program}
            onChange={handleChange}
            required
          />
          <input
            name="institution"
            placeholder="Institution"
            value={newImmersion.institution}
            onChange={handleChange}
            required
          />
          <input
            name="startDate"
            type="date"
            value={newImmersion.startDate}
            onChange={handleChange}
          />
          <input
            name="endDate"
            type="date"
            value={newImmersion.endDate}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Short description"
            value={newImmersion.description}
            onChange={handleChange}
          />
          <button type="submit" className="immersion-submit-btn">
            Save Immersion
          </button>
        </form>
      )}

      <table className="immersion-table">
        <thead>
          <tr>
            <th>Program</th>
            <th>Institution</th>
            <th>Start</th>
            <th>End</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredImmersions.length ? (
            filteredImmersions.map((item) => {
              const rowId = item.id || item._id;
              if (editId === rowId) {
                return (
                  <tr key={rowId}>
                    <td>
                      <input
                        name="program"
                        value={editImmersion.program}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="institution"
                        value={editImmersion.institution}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        name="startDate"
                        type="date"
                        value={editImmersion.startDate}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="endDate"
                        type="date"
                        value={editImmersion.endDate}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <textarea
                        name="description"
                        value={editImmersion.description}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button
                        className="immersion-submit-btn"
                        onClick={() => handleEditSave(rowId)}
                        type="button"
                      >
                        Save
                      </button>
                      <button
                        className="immersion-cancel-btn"
                        type="button"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={rowId}>
                  <td>{item.program}</td>
                  <td>{item.institution}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="immersion-edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="immersion-delete-btn"
                      onClick={() => handleDeleteImmersion(rowId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No immersion records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminImmersion;
