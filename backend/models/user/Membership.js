import db from "../../config/db.js"; // Adjust path as needed

// MySQL table creation (run separately from Node.js):
/*
CREATE TABLE UserMembership (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL, -- Reference to User table's id
  organization VARCHAR(255) NOT NULL,
  membershipType VARCHAR(100) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  status VARCHAR(50) DEFAULT 'active',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Add appropriate FOREIGN KEY constraint if your User table is in MySQL
*/

// Create new membership record
export function createMembership(membershipData, callback) {
  const {
    userId, organization, membershipType, startDate, endDate, status
  } = membershipData;
  db.query(
    "INSERT INTO UserMembership (userId, organization, membershipType, startDate, endDate, status) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, organization, membershipType, startDate, endDate, status || 'active'],
    callback
  );
}

// Get all membership records
export function getMemberships(callback) {
  db.query("SELECT * FROM UserMembership", callback);
}

// Get membership by ID
export function findMembershipById(id, callback) {
  db.query("SELECT * FROM UserMembership WHERE id = ?", [id], callback);
}

// Update membership by ID
export function updateMembership(id, membershipData, callback) {
  const {
    userId, organization, membershipType, startDate, endDate, status
  } = membershipData;
  db.query(
    "UPDATE UserMembership SET userId = ?, organization = ?, membershipType = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?",
    [userId, organization, membershipType, startDate, endDate, status || 'active', id],
    callback
  );
}

// Delete membership by ID
export function deleteMembership(id, callback) {
  db.query("DELETE FROM UserMembership WHERE id = ?", [id], callback);
}
