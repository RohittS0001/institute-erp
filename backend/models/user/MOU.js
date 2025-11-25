import db from "../../config/db.js"; // Adjust the path as necessary

// MySQL table creation (run this separately in MySQL):
/*
CREATE TABLE UserMOU (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  partnerOrganization VARCHAR(255) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

// Create new MOU
export function createMOU(mouData, callback) {
  const {
    title, partnerOrganization, startDate, endDate, description, status
  } = mouData;
  db.query(
    "INSERT INTO UserMOU (title, partnerOrganization, startDate, endDate, description, status) VALUES (?, ?, ?, ?, ?, ?)",
    [title, partnerOrganization, startDate, endDate, description, status || 'active'],
    callback
  );
}

// Get all MOUs
export function getMOUs(callback) {
  db.query("SELECT * FROM UserMOU", callback);
}

// Get MOU by ID
export function findMOUById(id, callback) {
  db.query("SELECT * FROM UserMOU WHERE id = ?", [id], callback);
}

// Update MOU by ID
export function updateMOU(id, mouData, callback) {
  const {
    title, partnerOrganization, startDate, endDate, description, status
  } = mouData;
  db.query(
    "UPDATE UserMOU SET title = ?, partnerOrganization = ?, startDate = ?, endDate = ?, description = ?, status = ? WHERE id = ?",
    [title, partnerOrganization, startDate, endDate, description, status || 'active', id],
    callback
  );
}

// Delete MOU by ID
export function deleteMOU(id, callback) {
  db.query("DELETE FROM UserMOU WHERE id = ?", [id], callback);
}
