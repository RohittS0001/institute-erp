// backend/models/admin/Institute.js
import pool from "../../config/db.js";

// Get all institutes
export async function getAllInstitutes() {
  const [rows] = await pool.query('SELECT * FROM AdminInstitutes');
  return rows;
}

// Create a new institute
export async function createInstitute(data) {
  const { name, address, contactEmail, contactPhone, status = "Active" } = data;
  const [result] = await pool.query(
    'INSERT INTO AdminInstitutes (name, address, contactEmail, contactPhone, status) VALUES (?, ?, ?, ?, ?)',
    [name, address, contactEmail, contactPhone, status]
  );
  return { id: result.insertId, name, address, contactEmail, contactPhone, status };
}

// Update an institute by ID
export async function updateInstituteById(id, data) {
  const { name, address, contactEmail, contactPhone, status } = data;
  const [result] = await pool.query(
    'UPDATE AdminInstitutes SET name=?, address=?, contactEmail=?, contactPhone=?, status=? WHERE id=?',
    [name, address, contactEmail, contactPhone, status, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, name, address, contactEmail, contactPhone, status };
}

// Delete an institute by ID
export async function deleteInstituteById(id) {
  const [result] = await pool.query('DELETE FROM AdminInstitutes WHERE id=?', [id]);
  return result.affectedRows > 0;
}

// (Optional) Count institutes
export async function getInstituteCount() {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM AdminInstitutes');
  return rows[0].count;
}
