// backend/models/admin/Financial.js
import pool from "../../config/db.js";

// Get all financial records
export async function getAllFinancials() {
  const [rows] = await pool.query('SELECT * FROM AdminFinancials');
  return rows;
}

// Add a new financial record
export async function createFinancialRecord(data) {
  const { category, amount, date, description, status = "Paid" } = data;
  const [result] = await pool.query(
    'INSERT INTO AdminFinancials (category, amount, date, description, status) VALUES (?, ?, ?, ?, ?)',
    [category, amount, date, description, status]
  );
  return { id: result.insertId, category, amount, date, description, status };
}

// Update a financial record by ID
export async function updateFinancialById(id, data) {
  const { category, amount, date, description, status } = data;
  const [result] = await pool.query(
    'UPDATE AdminFinancials SET category=?, amount=?, date=?, description=?, status=? WHERE id=?',
    [category, amount, date, description, status, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, category, amount, date, description, status };
}

// Delete a financial record by ID
export async function deleteFinancialById(id) {
  const [result] = await pool.query('DELETE FROM AdminFinancials WHERE id=?', [id]);
  return result.affectedRows > 0;
}
