import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const Attendance = sequelize.define("Attendance", {
  studentName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "Student"
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("Present", "Absent", "Late", "Leave"),
    allowNull: false
  }
});

export default Attendance;
