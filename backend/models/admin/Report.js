// backend/models/admin/Report.js
import pool from "../../config/db.js";

// Get all reports
export async function getAllReports() {
  const [rows] = await pool.query('SELECT * FROM AdminReports');
  return rows;
}

// Create a new report
export async function createReport(data) {
  const { type, content, createdAt = new Date(), createdBy, status = "Active" } = data;
  const [result] = await pool.query(
    'INSERT INTO AdminReports (type, content, createdAt, createdBy, status) VALUES (?, ?, ?, ?, ?)',
    [type, content, createdAt, createdBy, status]
  );
  return { id: result.insertId, type, content, createdAt, createdBy, status };
}

// Update a report by ID
export async function updateReportById(id, data) {
  const { type, content, createdAt, createdBy, status } = data;
  const [result] = await pool.query(
    'UPDATE AdminReports SET type=?, content=?, createdAt=?, createdBy=?, status=? WHERE id=?',
    [type, content, createdAt, createdBy, status, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, type, content, createdAt, createdBy, status };
}

// Delete a report by ID
export async function deleteReportById(id) {
  const [result] = await pool.query('DELETE FROM AdminReports WHERE id=?', [id]);
  return result.affectedRows > 0;
}
