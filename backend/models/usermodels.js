// models/userModel.js
import { pool } from "../config/db.js";

// Ensure Users table exists
export async function ensureUserTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `);
}

// Get all users
export async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM Users");
  return rows;
}

// Get user by email
export async function getUserByEmail(email) {
  const [rows] = await pool.query(
    "SELECT * FROM Users WHERE email = ?",
    [email.toLowerCase().trim()]
  );
  return rows[0] || null;
}

// Create new user
export async function createUser({ email, password }) {
  const [result] = await pool.query(
    "INSERT INTO Users (email, password) VALUES (?, ?)",
    [email.toLowerCase().trim(), password.trim()]
  );
  return { id: result.insertId, email };
}
