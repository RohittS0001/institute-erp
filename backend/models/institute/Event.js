// backend/models/Event.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Event = sequelize.define(
  "Event",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "events",
    timestamps: true,
  }
);

export default Event;
