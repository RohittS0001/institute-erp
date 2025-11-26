import { pool } from "../../config/db.js";

// Get Profile (first row)
export const getProfile = async () => {
  const [rows] = await pool.query("SELECT * FROM profile LIMIT 1");
  return rows[0] || null;
};

// Create Profile
export const createProfile = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO profile (name, email, phone, address, role) VALUES (?, ?, ?, ?, ?)",
    [data.name, data.email, data.phone, data.address, data.role]
  );
  return result.insertId;
};

// Update Profile
export const updateProfileDB = async (data) => {
  await pool.query(
    "UPDATE profile SET name=?, email=?, phone=?, address=?, role=? WHERE id=1",
    [data.name, data.email, data.phone, data.address, data.role]
  );
  return true;
};
