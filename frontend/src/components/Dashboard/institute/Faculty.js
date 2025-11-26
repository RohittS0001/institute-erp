// backend/models/faculty.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";   // Make sure this file exports your MySQL connection

const Faculty = sequelize.define(
  "Faculty",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,      // Prevent duplicate faculty emails
      validate: {
        isEmail: true,
      }
    }
  },
  {
    tableName: "faculty", // MySQL table name
    timestamps: true,     // createdAt, updatedAt
  }
);

export default Faculty;
