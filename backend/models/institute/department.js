import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const Department = sequelize.define("Department", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

export default Department;

 