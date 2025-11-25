import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  phone: {
    type: DataTypes.STRING,
  },

  rollNumber: {
    type: DataTypes.STRING,
    unique: true,
  },

  department: {
    type: DataTypes.STRING,
  },

  course: {
    type: DataTypes.STRING,
  },

  address: {
    type: DataTypes.TEXT,
  }
});

export default Student;
