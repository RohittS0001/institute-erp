import db from "../config/db.js";

// Create institute table (runs once)
export const createInstituteTable = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS institute (
      id INT AUTO_INCREMENT PRIMARY KEY,
      instituteName VARCHAR(150) NOT NULL,
      address VARCHAR(300),
      established INT,
      affiliation VARCHAR(200),
      contactEmail VARCHAR(150),
      contactPhone VARCHAR(20),
      about TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// Insert new institute
export const addInstitute = async (data) => {
  const {
    instituteName,
    address,
    established,
    affiliation,
    contactEmail,
    contactPhone,
    about,
  } = data;

  const [result] = await db.execute(
    `INSERT INTO institute (instituteName, address, established, affiliation, contactEmail, contactPhone, about)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [instituteName, address, established, affiliation, contactEmail, contactPhone, about]
  );

  return { id: result.insertId, ...data };
};

// Get all institutes
export const getAllInstitutes = async () => {
  const [rows] = await db.execute(`SELECT * FROM institute ORDER BY id DESC`);
  return rows;
};

// Get single institute by ID
export const getInstituteById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM institute WHERE id = ?`, [id]);
  return rows[0];
};

// Update institute
export const updateInstitute = async (id, data) => {
  const fields = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = Object.values(data);

  await db.execute(
    `UPDATE institute SET ${fields} WHERE id = ?`,
    [...values, id]
  );

  return { id, ...data };
};
