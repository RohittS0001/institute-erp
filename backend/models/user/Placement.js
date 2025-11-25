import db from "../../config/db.js"; // Adjust the path as needed

// MySQL table creation (run this in MySQL):
/*
CREATE TABLE UserPlacement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentName VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  package DECIMAL(15,2),
  dateOfPlacement DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'placed',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

// Create new placement record
export function createPlacement(placementData, callback) {
  const {
    studentName, company, position, package: pkg, dateOfPlacement, status
  } = placementData;
  db.query(
    "INSERT INTO UserPlacement (studentName, company, position, package, dateOfPlacement, status) VALUES (?, ?, ?, ?, ?, ?)",
    [studentName, company, position, pkg, dateOfPlacement, status || 'placed'],
    callback
  );
}

// Get all placement records
export function getPlacements(callback) {
  db.query("SELECT * FROM UserPlacement", callback);
}

// Get placement by ID
export function findPlacementById(id, callback) {
  db.query("SELECT * FROM UserPlacement WHERE id = ?", [id], callback);
}

// Update placement by ID
export function updatePlacement(id, placementData, callback) {
  const {
    studentName, company, position, package: pkg, dateOfPlacement, status
  } = placementData;
  db.query(
    "UPDATE UserPlacement SET studentName = ?, company = ?, position = ?, package = ?, dateOfPlacement = ?, status = ? WHERE id = ?",
    [studentName, company, position, pkg, dateOfPlacement, status || 'placed', id],
    callback
  );
}

// Delete placement by ID
export function deletePlacement(id, callback) {
  db.query("DELETE FROM UserPlacement WHERE id = ?", [id], callback);
}
