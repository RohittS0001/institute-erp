// models/userModel.js
import { pool } from "../config/db.js";

// Auto-create Users table if it doesn't exist
export async function ensureUserTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
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

// Create a new user
export async function createUser(data) {
  const { email, password } = data;
  const [result] = await pool.query(
    "INSERT INTO Users (email, password) VALUES (?, ?)",
    [email.toLowerCase().trim(), password]
  );
  return { id: result.insertId, email, password };
}

// Update user by ID
export async function updateUserById(id, data) {
  const { email, password } = data;
  const [result] = await pool.query(
    "UPDATE Users SET email = ?, password = ? WHERE id = ?",
    [email.toLowerCase().trim(), password, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, email, password };
}

// Delete user by ID
export async function deleteUserById(id) {
  const [result] = await pool.query("DELETE FROM Users WHERE id = ?", [id]);
  return result.affectedRows > 0;
}


// import { pool } from "../config/db.js";


// export async function ensureUsersIDsTableExists() {
//   await pool.execute(`
//     CREATE TABLE IF NOT EXISTS UsersIDs (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL UNIQUE,
//       email VARCHAR(255) NOT NULL UNIQUE,
//       password VARCHAR(255) NOT NULL,
//       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//       updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     );
//   `);
// }

// // Create new user
// export async function createUser({ name, email, password }) {
//   const [result] = await pool.execute(
//     "INSERT INTO UsersIDs (name, email, password) VALUES (?, ?, ?)",
//     [name.toLowerCase().trim(), email.toLowerCase().trim(), password]
//   );
//   return { id: result.insertId, name: name.toLowerCase().trim(), email: email.toLowerCase().trim(), password };
// }

// // Get user by email (for login)
// export async function findUserByEmail(email) {
//   const [rows] = await pool.execute(
//     "SELECT * FROM UsersIDs WHERE email = ?",
//     [email.toLowerCase().trim()]
//   );
//   return rows[0];
// }

// // Get user by ID
// export async function findUserById(id) {
//   const [rows] = await pool.execute(
//     "SELECT * FROM UsersIDs WHERE id = ?",
//     [id]
//   );
//   return rows[0];
// }

// // Get all users
// export async function getUsers() {
//   const [rows] = await pool.execute(
//     "SELECT * FROM UsersIDs"
//   );
//   return rows;
// }

// // Update user by ID
// export async function updateUserById(id, { name, email, password }) {
//   const [result] = await pool.execute(
//     "UPDATE UsersIDs SET name=?, email=?, password=? WHERE id=?",
//     [name.toLowerCase().trim(), email.toLowerCase().trim(), password, id]
//   );
//   if (result.affectedRows === 0) return null;
//   return { id, name: name.toLowerCase().trim(), email: email.toLowerCase().trim(), password };
// }

// // Delete user by ID
// export async function deleteUserById(id) {
//   const [result] = await pool.execute(
//     "DELETE FROM UsersIDs WHERE id = ?",
//     [id]
//   );
//   return result.affectedRows > 0;
// }
