import db from "../config/db.js";

// Report model using MySQL

export const Report = {
  // Create new report
  create: async ({ title, type, details }) => {
    const [result] = await db.query(
      "INSERT INTO reports (title, type, details) VALUES (?, ?, ?)",
      [title, type, details]
    );
    return result.insertId;
  },

  // Get all reports
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM reports ORDER BY id DESC");
    return rows;
  },

  // Find a single report
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM reports WHERE id = ?", [id]);
    return rows[0];
  }
};
