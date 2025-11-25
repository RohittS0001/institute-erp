import db from "../../config/db.js"; // Adjust the path as necessary

// MySQL table creation (run separately):
/*
CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role ENUM('user', 'admin', 'institute') NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
*/

// Create a new user record
export function createUser(userData, callback) {
  const { name, email, role, password } = userData;
  db.query(
    "INSERT INTO User (name, email, role, password) VALUES (?, ?, ?, ?)",
    [name, email, role, password],
    callback
  );
}

// Get all users
export function getUsers(callback) {
  db.query("SELECT * FROM User", callback);
}

// Get user by ID
export function findUserById(id, callback) {
  db.query("SELECT * FROM User WHERE id = ?", [id], callback);
}

// Get user by email (useful for login/security)
export function findUserByEmail(email, callback) {
  db.query("SELECT * FROM User WHERE email = ?", [email], callback);
}

// Update user by ID
export function updateUser(id, userData, callback) {
  const { name, email, role, password } = userData;
  db.query(
    "UPDATE User SET name = ?, email = ?, role = ?, password = ? WHERE id = ?",
    [name, email, role, password, id],
    callback
  );
}

// Delete user by ID
export function deleteUser(id, callback) {
  db.query("DELETE FROM User WHERE id = ?", [id], callback);
}
