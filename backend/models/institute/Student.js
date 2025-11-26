import { pool } from "../../config/db.js";

// Get all students
export const getStudents = async () => {
  const [rows] = await pool.query("SELECT * FROM students");
  return rows;
};

// Add student
export const addStudent = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO students (name, roll, branch, email) VALUES (?, ?, ?, ?)",
    [data.name, data.roll, data.branch, data.email]
  );
  return result.insertId;
};

// Update student
export const updateStudent = async (id, data) => {
  await pool.query(
    "UPDATE students SET name=?, roll=?, branch=?, email=? WHERE id=?",
    [data.name, data.roll, data.branch, data.email, id]
  );
  return true;
};

// Delete student
export const deleteStudent = async (id) => {
  await pool.query("DELETE FROM students WHERE id=?", [id]);
  return true;
};

// Count students (optional)
export const countStudents = async () => {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM students");
  return rows[0].total;
};
