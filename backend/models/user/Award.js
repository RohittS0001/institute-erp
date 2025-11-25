import db from "../../config/db.js"; // Adjust path if needed

// SQL table creation (run this in MySQL, not in Node.js):
// CREATE TABLE UserAward (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   title VARCHAR(255) NOT NULL,
//   recipient VARCHAR(255) NOT NULL,
//   date DATE NOT NULL,
//   details TEXT,
//   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );

export function createAward(awardData, callback) {
  const { title, recipient, date, details } = awardData;
  db.query(
    "INSERT INTO UserAward (title, recipient, date, details) VALUES (?, ?, ?, ?)",
    [title, recipient, date, details],
    callback
  );
}

export function getAwards(callback) {
  db.query("SELECT * FROM UserAward", callback);
}

export function findAwardById(id, callback) {
  db.query("SELECT * FROM UserAward WHERE id = ?", [id], callback);
}

export function updateAward(id, awardData, callback) {
  const { title, recipient, date, details } = awardData;
  db.query(
    "UPDATE UserAward SET title = ?, recipient = ?, date = ?, details = ? WHERE id = ?",
    [title, recipient, date, details, id],
    callback
  );
}

export function deleteAward(id, callback) {
  db.query("DELETE FROM UserAward WHERE id = ?", [id], callback);
}

