import { pool } from "../../config/db.js";

// Get all reports
export const getReports = async () => {
  const [rows] = await pool.query("SELECT * FROM reports");
  return rows;
};

// Add report
export const addReport = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO reports (title, description, created_at) VALUES (?, ?, NOW())",
    [data.title, data.description]
  );
  return result.insertId;
};

// Update report
export const updateReport = async (id, data) => {
  await pool.query(
    "UPDATE reports SET title=?, description=? WHERE id=?",
    [data.title, data.description, id]
  );
  return true;
};

// Delete report
export const deleteReport = async (id) => {
  await pool.query("DELETE FROM reports WHERE id=?", [id]);
  return true;
};

// Count reports (optional)
export const countReports = async () => {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM reports");
  return rows[0].total;
};
