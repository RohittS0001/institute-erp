import db from "../config/db.js";

// Add department
export const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Department name required" });

    const [result] = await db.execute(
      "INSERT INTO departments (name) VALUES (?)",
      [name]
    );

    res.json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM departments ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
