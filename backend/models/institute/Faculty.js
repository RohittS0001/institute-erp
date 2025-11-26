import { pool } from "../../config/db.js";

// Get all faculty
export const getFaculty = async () => {
  const [rows] = await pool.query("SELECT * FROM faculty");
  return rows;
};

// Add a faculty member
export const addFaculty = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO faculty (name, email, department, designation) VALUES (?, ?, ?, ?)",
    [data.name, data.email, data.department, data.designation]
  );
  return result.insertId;
};

// Update faculty
export const updateFaculty = async (id, data) => {
  await pool.query(
    "UPDATE faculty SET name=?, email=?, department=?, designation=? WHERE id=?",
    [data.name, data.email, data.department, data.designation, id]
  );
  return true;
};

// Delete faculty
export const deleteFaculty = async (id) => {
  await pool.query("DELETE FROM faculty WHERE id=?", [id]);
  return true;
};

// Count faculty (optional for dashboard)
export const countFaculty = async () => {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM faculty");
  return rows[0].total;
};
