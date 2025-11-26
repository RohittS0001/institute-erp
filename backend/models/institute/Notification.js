import { pool } from "../../config/db.js";   // ✅ FIXED

// GET all departments
export const getDepartments = async () => {
  const [rows] = await pool.query("SELECT * FROM departments");
  return rows;
};

// ADD department
export const addDepartment = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO departments (name, head, description) VALUES (?, ?, ?)",
    [data.name, data.head, data.description]
  );
  return result.insertId;
};

// UPDATE department
export const updateDepartment = async (id, data) => {
  await pool.query(
    "UPDATE departments SET name=?, head=?, description=? WHERE id=?",
    [data.name, data.head, data.description, id]
  );
  return true;
};

// DELETE department
export const deleteDepartment = async (id) => {
  await pool.query("DELETE FROM departments WHERE id=?", [id]);
  return true;
};

