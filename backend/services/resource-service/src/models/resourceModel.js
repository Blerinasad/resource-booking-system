import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Resource = sequelize.define(
  "Resource",
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

    type: {
      type: DataTypes.ENUM("room", "lab", "equipment", "workspace"),
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("available", "unavailable", "maintenance"),
      defaultValue: "available",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "created_by",
    },
  },
  {
    tableName: "resources",
    timestamps: true,
    indexes: [
      { fields: ["type"] },
      { fields: ["status"] },
      { fields: ["location"] },
    ],
  }
);

export default Resource;
