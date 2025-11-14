import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Institutes.css";

const Institutes = () => {
  const [search, setSearch] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstitute, setNewInstitute] = useState({
    name: "",
    location: "",
    status: "Active",
    contactPerson: "",
    email: "",
  });

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/institutes");
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
      inst.location.toLowerCase().includes(search.toLowerCase()) ||
      inst.status.toLowerCase().includes(search.toLowerCase()) ||
      inst.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      inst.email.toLowerCase().includes(search.toLowerCase())
  );

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
      const response = await axios.post(
        "http://localhost:4000/api/institutes",
        newInstitute
      );
      setInstitutes((prev) => [...prev, response.data]);
      setNewInstitute({
        name: "",
        location: "",
        status: "Active",
        contactPerson: "",
        email: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add institute:", error);
      alert("Failed to add institute. Please try again.");
    }
  };

  const toggleForm = () => setShowAddForm((prev) => !prev);

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
            name="location"
            placeholder="Location"
            value={newInstitute.location}
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
            name="contactPerson"
            placeholder="Contact Person"
            value={newInstitute.contactPerson}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={newInstitute.email}
            onChange={handleChange}
            type="email"
          />
          <button type="submit" className="submit-btn">
            Save Institute
          </button>
        </form>
      )}

      <table className="institutes-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Contact Person</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length ? (
            filtered.map((instit) => (
              <tr key={instit.id || instit._id}>
                <td>{instit.name}</td>
                <td>{instit.location}</td>
                <td>
                  <span
                    className={
                      instit.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {instit.status}
                  </span>
                </td>
                <td>{instit.contactPerson}</td>
                <td>{instit.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No institutes found matching your criteria.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Institutes;
