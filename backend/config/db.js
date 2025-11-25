import { Sequelize } from "sequelize";

// 1) Create Sequelize instance (MySQL connection)
export const sequelize = new Sequelize(
  "INSTITUTE_ERP",        // 🟢 Database name (create in MySQL)
  "root",                 // 🟢 MySQL username
  "your_mysql_password",  // 🟢 MySQL password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,       // set true to see SQL logs
  }
);

// 2) Function to connect DB + sync models
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected Successfully!");

    // This will create/alter tables based on models
    await sequelize.sync({ alter: true });
    console.log("✅ All Models Synced to MySQL!");
  } catch (error) {
    console.error("❌ Error connecting to MySQL:", error.message);
    process.exit(1);
  }
};
