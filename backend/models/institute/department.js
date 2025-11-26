import { pool } from "../../config/db.js";

export const getDepartments = async () => {
  const [rows] = await pool.query("SELECT * FROM departments");
  return rows;
};

export const addDepartment = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO departments (name, head, description) VALUES (?, ?, ?)",
    [data.name, data.head, data.description]
  );
  return result.insertId;
};

export const updateDepartment = async (id, data) => {
  await pool.query(
    "UPDATE departments SET name=?, head=?, description=? WHERE id=?",
    [data.name, data.head, data.description, id]
  );
  return true;
};

export const deleteDepartment = async (id) => {
  await pool.query("DELETE FROM departments WHERE id=?", [id]);
  return true;
};

export const countDepartments = async () => {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM departments");
  return rows[0].total;
};
