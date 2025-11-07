import React, { useState } from "react";
import "./Institutes.css";

const dummyInstitutes = [
  {
    id: 1,
    name: "Institute A",
    location: "New York",
    status: "Active",
    contactPerson: "John Doe",
    email: "john@insta.com",
  },
  {
    id: 2,
    name: "Institute B",
    location: "California",
    status: "Inactive",
    contactPerson: "Alice Smith",
    email: "alice@instb.com",
  },
  {
    id: 3,
    name: "Institute C",
    location: "Texas",
    status: "Active",
    contactPerson: "Richard Roe",
    email: "richard@instc.com",
  },
];

const Institutes = () => {
  const [search, setSearch] = useState("");
  const [institutes, setInstitutes] = useState(dummyInstitutes);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstitute, setNewInstitute] = useState({
    name: "",
    location: "",
    status: "Active",
    contactPerson: "",
    email: "",
  });

  // Handle filter
  const filtered = institutes.filter(
    (inst) =>
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.location.toLowerCase().includes(search.toLowerCase()) ||
      inst.status.toLowerCase().includes(search.toLowerCase()) ||
      inst.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      inst.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle input changes for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstitute((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission adding a new institute
  const handleAddInstitute = (e) => {
    e.preventDefault();
    if (!newInstitute.name.trim()) {
      alert("Institute Name is required");
      return;
    }
    setInstitutes((prev) => [
      ...prev,
      { ...newInstitute, id: prev.length + 1 },
    ]);
    setNewInstitute({
      name: "",
      location: "",
      status: "Active",
      contactPerson: "",
      email: "",
    });
    setShowAddForm(false);
  };

  // Toggle Add Form
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
              <tr key={instit.id}>
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
