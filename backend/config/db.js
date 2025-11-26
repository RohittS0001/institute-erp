import mysql from "mysql2/promise";

// MySQL pool connection
export const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "sahfonn",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
export const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL Connected Successfully");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);
    process.exit(1);
  }
};
