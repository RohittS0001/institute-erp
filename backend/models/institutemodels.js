
import { sequelize } from "../config/db.js";

const InstituteRecord = sequelize.define(
  "InstituteRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "InstituteIDs",   // Same collection name you used in MongoDB
    timestamps: true,            // Same as mongoose timestamps
  }
);

export default InstituteRecord;
