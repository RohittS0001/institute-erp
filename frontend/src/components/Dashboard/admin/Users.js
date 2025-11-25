import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()) ||
      user.status.toLowerCase().includes(search.toLowerCase())
  );

  // Add form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert("Name and Email are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/admin/users", newUser);
      setUsers((prev) => [...prev, response.data]);
      setNewUser({ name: "", email: "", role: "User", status: "Active" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  // Edit handlers
  const handleEdit = (user) => {
    setEditId(user.id);
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/admin/users/${id}`, editUser);
      setUsers((prev) =>
        prev.map((user) => user.id === id ? response.data : user)
      );
      setEditId(null);
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/admin/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const toggleForm = () => setShowAddForm((prev) => !prev);
  const cancelEdit = () => setEditId(null);

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
          <button type="submit" className="submit-btn">Add User</button>
        </form>
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length ? (
            filteredUsers.map((user) =>
              editId === user.id ? (
                <tr key={user.id} className={user.status.toLowerCase()}>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editUser.name}
                      onChange={handleEditChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editUser.email}
                      onChange={handleEditChange}
                      required
                    />
                  </td>
                  <td>
                    <select name="role" value={editUser.role} onChange={handleEditChange}>
                      <option value="User">User</option>
                      <option value="Institute Admin">Institute Admin</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select name="status" value={editUser.status} onChange={handleEditChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button className="submit-btn" onClick={() => handleSave(user.id)}>Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={user.id} className={user.status.toLowerCase()}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button className="edit-B" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="delete-B" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
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
