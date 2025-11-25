import db from "../../config/db.js"; // Adjust path as needed

// MySQL table creation (run separately):
/*
CREATE TABLE UserResearch (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  researcherName VARCHAR(255) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  summary TEXT,
  status VARCHAR(50) DEFAULT 'ongoing',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

// Create new research record
export function createResearch(researchData, callback) {
  const { title, researcherName, startDate, endDate, summary, status } = researchData;
  db.query(
    "INSERT INTO UserResearch (title, researcherName, startDate, endDate, summary, status) VALUES (?, ?, ?, ?, ?, ?)",
    [title, researcherName, startDate, endDate, summary, status || 'ongoing'],
    callback
  );
}

// Get all research records
export function getResearch(callback) {
  db.query("SELECT * FROM UserResearch", callback);
}

// Get research by ID
export function findResearchById(id, callback) {
  db.query("SELECT * FROM UserResearch WHERE id = ?", [id], callback);
}

// Update research by ID
export function updateResearch(id, researchData, callback) {
  const { title, researcherName, startDate, endDate, summary, status } = researchData;
  db.query(
    "UPDATE UserResearch SET title = ?, researcherName = ?, startDate = ?, endDate = ?, summary = ?, status = ? WHERE id = ?",
    [title, researcherName, startDate, endDate, summary, status || 'ongoing', id],
    callback
  );
}

// Delete research by ID
export function deleteResearch(id, callback) {
  db.query("DELETE FROM UserResearch WHERE id = ?", [id], callback);
}
