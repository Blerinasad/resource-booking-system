import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },

    resourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "resource_id",
    },

    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "start_time",
    },

    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "end_time",
    },

    purpose: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "cancelled", "completed", "no-show"),
      defaultValue: "pending",
    },

    decisionNote: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "decision_note",
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["resource_id"] },
      { fields: ["status"] },
      { fields: ["start_time"] },
      { fields: ["end_time"] },
    ],
  }
);

export default Booking;
