import { Sequelize } from "sequelize";

// MAIN SEQUELIZE INSTANCE
export const sequelize = new Sequelize(
  "INSTITUTE_ERP",      // Database name
  "root",               // MySQL username
  "your_mysql_password",// MySQL password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// CONNECT DATABASE
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected Successfully!");

    await sequelize.sync({ alter: true });
    console.log("✅ Models Synced Successfully!");
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err.message);
    process.exit(1);
  }
};
