import db from "../../config/db.js"; // Adjust the path as needed

// MySQL table (run this separately in MySQL):
/*
CREATE TABLE UserDonation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor VARCHAR(255) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  date DATE NOT NULL,
  purpose VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

// Create new donation
export function createDonation(donationData, callback) {
  const { donor, amount, date, purpose } = donationData;
  db.query(
    "INSERT INTO UserDonation (donor, amount, date, purpose) VALUES (?, ?, ?, ?)",
    [donor, amount, date, purpose],
    callback
  );
}

// Get all donations
export function getDonations(callback) {
  db.query("SELECT * FROM UserDonation", callback);
}

// Get donation by ID
export function findDonationById(id, callback) {
  db.query("SELECT * FROM UserDonation WHERE id = ?", [id], callback);
}

// Update donation by ID
export function updateDonation(id, donationData, callback) {
  const { donor, amount, date, purpose } = donationData;
  db.query(
    "UPDATE UserDonation SET donor = ?, amount = ?, date = ?, purpose = ? WHERE id = ?",
    [donor, amount, date, purpose, id],
    callback
  );
}

// Delete donation by ID
export function deleteDonation(id, callback) {
  db.query("DELETE FROM UserDonation WHERE id = ?", [id], callback);
}
