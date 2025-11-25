// Course.js (MySQL version)
import pool from '../../config/db.js';

// Get all courses
export async function getAllCourses() {
  const [rows] = await pool.query('SELECT * FROM AdminCourses');
  return rows;
}

// Create a new course
export async function createCourse(data) {
  const { title, duration, instructor, status = 'Active' } = data;
  const [result] = await pool.query(
    'INSERT INTO AdminCourses (title, duration, instructor, status) VALUES (?, ?, ?, ?)',
    [title, duration, instructor, status]
  );
  // Return the inserted course (optionally fetch by ID)
  return { id: result.insertId, title, duration, instructor, status };
}

// Update a course by ID
export async function updateCourseById(id, data) {
  const { title, duration, instructor, status } = data;
  const [result] = await pool.query(
    'UPDATE AdminCourses SET title=?, duration=?, instructor=?, status=? WHERE id=?',
    [title, duration, instructor, status, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, title, duration, instructor, status };
}

// Delete a course by ID
export async function deleteCourseById(id) {
  const [result] = await pool.query('DELETE FROM AdminCourses WHERE id=?', [id]);
  return result.affectedRows > 0;
}
