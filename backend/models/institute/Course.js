import { pool } from "../../config/db.js";

// Get all courses
export const getCourses = async () => {
  const [rows] = await pool.query("SELECT * FROM courses");
  return rows;
};

// Add a course
export const addCourse = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO courses (name, code, department, duration, credits) VALUES (?, ?, ?, ?, ?)",
    [data.name, data.code, data.department, data.duration, data.credits]
  );
  return result.insertId;
};

// Update course
export const updateCourse = async (id, data) => {
  await pool.query(
    "UPDATE courses SET name=?, code=?, department=?, duration=?, credits=? WHERE id=?",
    [data.name, data.code, data.department, data.duration, data.credits, id]
  );
  return true;
};

// Delete course
export const deleteCourse = async (id) => {
  await pool.query("DELETE FROM courses WHERE id=?", [id]);
  return true;
};

// Count courses (for dashboard)
export const countCourses = async () => {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM courses");
  return rows[0].total;
};
