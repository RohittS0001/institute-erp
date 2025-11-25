import { Sequelize } from "sequelize";

// Create Sequelize instance (MySQL connection)
export const sequelize = new Sequelize(
  "INSTITUTE_ERP",        // Database name
  "root",                 // MySQL username
  "your_mysql_password",  // MySQL password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// Connect DB + Sync Tables
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected Successfully!");

    await sequelize.sync({ alter: true });
    console.log("✅ All Models Synced to MySQL!");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);
    process.exit(1);
  }
};
