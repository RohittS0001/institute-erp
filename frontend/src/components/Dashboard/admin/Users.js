import React, { useState } from "react";
import "./Users.css";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Institute Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Admin",
    status: "Active",
  },
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  // Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()) ||
      user.status.toLowerCase().includes(search.toLowerCase())
  );

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert("Name and Email are required");
      return;
    }
    setUsers((prev) => [
      ...prev,
      { ...newUser, id: prev.length + 1 },
    ]);
    setNewUser({ name: "", email: "", role: "User", status: "Active" });
    setShowAddForm(false);
  };

  // Toggle form display
  const toggleForm = () => setShowAddForm(!showAddForm);

  return (
    <div className="page-content">
      <h1>User Management</h1>
      <div className="header-top">
        <input
          type="search"
          className="users-search"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={toggleForm} className="add-btn">
          {showAddForm ? "Close Form" : "Add New User"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddUser} className="add-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={newUser.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <select name="role" value={newUser.role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Institute Admin">Institute Admin</option>
            <option value="Admin">Admin</option>
          </select>
          <select name="status" value={newUser.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="submit-btn">
            Add User
          </button>
        </form>
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className={user.status.toLowerCase()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
