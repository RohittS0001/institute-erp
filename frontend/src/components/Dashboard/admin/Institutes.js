import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Institutes.css";

const Institutes = () => {
  const [search, setSearch] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstitute, setNewInstitute] = useState({
    name: "",
    address: "",
    status: "Active",
    contactPhone: "",
    contactEmail: "",
  });
  const [editId, setEditId] = useState(null);
  const [editInstitute, setEditInstitute] = useState({
    name: "",
    address: "",
    status: "Active",
    contactPhone: "",
    contactEmail: "",
  });

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/institutes");
        setInstitutes(response.data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
        setInstitutes([]);
      }
    };
    fetchInstitutes();
  }, []);

  const filtered = institutes.filter(
    (inst) =>
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      (inst.address && inst.address.toLowerCase().includes(search.toLowerCase())) ||
      (inst.status && inst.status.toLowerCase().includes(search.toLowerCase())) ||
      (inst.contactPhone && inst.contactPhone.toLowerCase().includes(search.toLowerCase())) ||
      (inst.contactEmail && inst.contactEmail.toLowerCase().includes(search.toLowerCase()))
  );

  // Add form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstitute((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInstitute = async (e) => {
    e.preventDefault();
    if (!newInstitute.name.trim()) {
      alert("Institute Name is required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/admin/institutes", newInstitute);
      setInstitutes((prev) => [...prev, response.data]);
      setNewInstitute({
        name: "",
        address: "",
        status: "Active",
        contactPhone: "",
        contactEmail: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add institute:", error);
      alert("Failed to add institute. Please try again.");
    }
  };

  // Delete handler
  const handleDeleteInstitute = async (id) => {
    if (!window.confirm("Are you sure you want to delete this institute?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/admin/institutes/${id}`);
      setInstitutes((prev) => prev.filter((instit) => instit.id !== id));
    } catch (error) {
      console.error("Failed to delete institute:", error);
      alert("Failed to delete institute. Please try again.");
    }
  };

  // Edit handlers
  const handleEdit = (instit) => {
    setEditId(instit.id);
    setEditInstitute({
      name: instit.name,
      address: instit.address,
      status: instit.status,
      contactPhone: instit.contactPhone,
      contactEmail: instit.contactEmail,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditInstitute((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/admin/institutes/${id}`,
        editInstitute
      );
      setInstitutes((prev) =>
        prev.map((instit) => instit.id === id ? response.data : instit)
      );
      setEditId(null);
    } catch (error) {
      console.error("Failed to update institute:", error);
      alert("Failed to update institute. Please try again.");
    }
  };

  const toggleForm = () => setShowAddForm((prev) => !prev);
  const cancelEdit = () => setEditId(null);

  return (
    <div className="page-content">
      <h1>Institutes Management</h1>
      <div className="header-top">
        <input
          type="search"
          placeholder="Search Institutes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="institutes-search"
        />
        <button onClick={toggleForm} className="add-btn">
          {showAddForm ? "Close Form" : "Add New Institute"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddInstitute} className="add-form">
          <input
            name="name"
            placeholder="Institute Name"
            value={newInstitute.name}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={newInstitute.address}
            onChange={handleChange}
          />
          <select
            name="status"
            value={newInstitute.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            name="contactPhone"
            placeholder="Contact Phone"
            value={newInstitute.contactPhone}
            onChange={handleChange}
          />
          <input
            name="contactEmail"
            placeholder="Email"
            value={newInstitute.contactEmail}
            onChange={handleChange}
            type="email"
          />
          <button type="submit" className="submit-btn">Save Institute</button>
        </form>
      )}

      <table className="institutes-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Status</th>
            <th>Contact Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length ? (
            filtered.map((instit) =>
              editId === instit.id ? (
                <tr key={instit.id}>
                  <td>
                    <input
                      name="name"
                      value={editInstitute.name}
                      onChange={handleEditChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      name="address"
                      value={editInstitute.address}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      value={editInstitute.status}
                      onChange={handleEditChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <input
                      name="contactPhone"
                      value={editInstitute.contactPhone}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      name="contactEmail"
                      value={editInstitute.contactEmail}
                      onChange={handleEditChange}
                      type="email"
                    />
                  </td>
                  <td>
                    <button className="submit-btn" onClick={() => handleSave(instit.id)}>Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={instit.id}>
                  <td>{instit.name}</td>
                  <td>{instit.address}</td>
                  <td>
                    <span className={instit.status === "Active" ? "status-active" : "status-inactive"}>
                      {instit.status}
                    </span>
                  </td>
                  <td>{instit.contactPhone}</td>
                  <td>{instit.contactEmail}</td>
                  <td>
                    <button className="edit-B" onClick={() => handleEdit(instit)}>Edit</button>
                    <button className="delete-B" onClick={() => handleDeleteInstitute(instit.id)}>Delete</button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No institutes found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Institutes;
