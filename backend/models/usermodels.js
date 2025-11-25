import { getPool } from "../../config/db.js";

// Create Users table:
// Note: Run this SQL once manually in your MySQL DB:
/*
CREATE TABLE UsersIDs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

// Create new user
export async function createUser(userData) {
  const { name, email, password } = userData;
  const pool = getPool();
  const [result] = await pool.execute(
    "INSERT INTO UsersIDs (name, email, password) VALUES (?, ?, ?)",
    [name.toLowerCase().trim(), email.toLowerCase().trim(), password]
  );
  return { id: result.insertId, ...userData };
}

// Get user by email (useful for login)
export async function findUserByEmail(email) {
  const pool = getPool();
  const [rows] = await pool.execute(
    "SELECT * FROM UsersIDs WHERE email = ?",
    [email.toLowerCase().trim()]
  );
  return rows[0];
}

// Additional CRUD functions can be added similarly
