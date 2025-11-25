import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const Report = sequelize.define("Report", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

export default Report;
