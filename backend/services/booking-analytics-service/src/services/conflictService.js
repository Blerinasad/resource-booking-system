import { Op } from "sequelize";
import Booking from "../models/bookingModel.js";

export const findBookingConflict = async ({ resourceId, startTime, endTime, excludeBookingId = null }) => {
  const where = {
    resourceId,
    status: {
      [Op.in]: ["pending", "approved"],
    },
    startTime: {
      [Op.lt]: new Date(endTime),
    },
    endTime: {
      [Op.gt]: new Date(startTime),
    },
  };

  if (excludeBookingId) {
    where.id = { [Op.ne]: excludeBookingId };
  }

  return await Booking.findOne({ where });
};
