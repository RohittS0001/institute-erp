// db.js (MySQL version)
import mysql from "mysql2/promise";

// Configuration for your MySQL connection
const pool = mysql.createPool({
  host: 'your-mysql-host',           // e.g. 'localhost' or cPanel host
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name'
});

export const connectDB = async () => {
  try {
    // Simple test to verify connection; you use pool for queries elsewhere
    await pool.getConnection();
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

// Export pool so other files can use for queries
export default pool;
