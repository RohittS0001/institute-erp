import db from "../config/db.js";

// Create faculty table if not exists
export const createFacultyTable = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS faculty (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      department VARCHAR(100),
      email VARCHAR(150) NOT NULL UNIQUE,
      phone VARCHAR(20),
      designation VARCHAR(100),
      qualification VARCHAR(150),
      joiningDate VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// Insert new faculty
export const addFaculty = async (faculty) => {
  const { name, department, email, phone, designation, qualification, joiningDate } = faculty;

  const [result] = await db.execute(
    `INSERT INTO faculty (name, department, email, phone, designation, qualification, joiningDate)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, department, email, phone, designation, qualification, joiningDate]
  );

  return { id: result.insertId, ...faculty };
};

// Get all faculty
export const getAllFaculty = async () => {
  const [rows] = await db.execute(`SELECT * FROM faculty ORDER BY id DESC`);
  return rows;
};

// Get faculty by ID
export const getFacultyById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM faculty WHERE id = ?`, [id]);
  return rows[0];
};
