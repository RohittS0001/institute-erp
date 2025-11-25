// backend/models/institute/Course.js

import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const Course = sequelize.define("Course", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING,
    defaultValue: "General",
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 4,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

export default Course;
