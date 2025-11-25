import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const Notification = sequelize.define("Notification", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  date: {
    type: DataTypes.STRING, 
    allowNull: true,
  },

  target: {
    type: DataTypes.ENUM("All", "Students", "Faculty"),
    defaultValue: "All",
  },

  createdBy: {
    type: DataTypes.INTEGER,   // foreign key (Faculty ID)
    allowNull: true,
  }
});

export default Notification;
