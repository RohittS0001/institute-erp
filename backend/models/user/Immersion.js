import db from "../../config/db.js"; // Adjust the path as needed

// MySQL table (run this separately in MySQL):
/*
CREATE TABLE UserImmersion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

// Create new immersion record
export function createImmersion(immersionData, callback) {
  const { program, institution, startDate, endDate, description } = immersionData;
  db.query(
    "INSERT INTO UserImmersion (program, institution, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)",
    [program, institution, startDate, endDate, description],
    callback
  );
}

// Get all immersions
export function getImmersions(callback) {
  db.query("SELECT * FROM UserImmersion", callback);
}

// Get immersion by ID
export function findImmersionById(id, callback) {
  db.query("SELECT * FROM UserImmersion WHERE id = ?", [id], callback);
}

// Update immersion by ID
export function updateImmersion(id, immersionData, callback) {
  const { program, institution, startDate, endDate, description } = immersionData;
  db.query(
    "UPDATE UserImmersion SET program = ?, institution = ?, startDate = ?, endDate = ?, description = ? WHERE id = ?",
    [program, institution, startDate, endDate, description, id],
    callback
  );
}

// Delete immersion by ID
export function deleteImmersion(id, callback) {
  db.query("DELETE FROM UserImmersion WHERE id = ?", [id], callback);
}
