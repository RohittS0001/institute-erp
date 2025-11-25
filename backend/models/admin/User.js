// backend/models/admin/User.js
import pool from "../../config/db.js";

// Get all users
export async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM AdminUsers');
  return rows;
}

// Get user count
export async function getUserCount() {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM AdminUsers');
  return rows[0].count;
}

// Create a new user
export async function createUser(data) {
  const { name, email, role = "User", status = "Active", createdAt = new Date() } = data;
  const [result] = await pool.query(
    'INSERT INTO AdminUsers (name, email, role, status, createdAt) VALUES (?, ?, ?, ?, ?)',
    [name, email, role, status, createdAt]
  );
  return { id: result.insertId, name, email, role, status, createdAt };
}

// Update a user by ID
export async function updateUserById(id, data) {
  const { name, email, role, status } = data;
  const [result] = await pool.query(
    'UPDATE AdminUsers SET name=?, email=?, role=?, status=? WHERE id=?',
    [name, email, role, status, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, name, email, role, status };
}

// Delete a user by ID
export async function deleteUserById(id) {
  const [result] = await pool.query('DELETE FROM AdminUsers WHERE id=?', [id]);
  return result.affectedRows > 0;
}
