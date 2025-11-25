import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Institute = sequelize.define("Institute", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  establishedYear: { type: DataTypes.INTEGER },
  affiliation: { type: DataTypes.STRING }
});

export default Institute;
