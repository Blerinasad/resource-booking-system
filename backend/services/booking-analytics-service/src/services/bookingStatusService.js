import { Op } from "sequelize";
import Booking from "../models/bookingModel.js";
import { publishBookingEvent } from "../events/bookingProducer.js";
import { trackBookingEvent } from "./analyticsService.js";

export const updateExpiredBookings = async () => {
  const now = new Date();

  const approvedBookings = await Booking.findAll({
    where: {
      status: "approved",
      endTime: { [Op.lt]: now },
    },
  });

  for (const booking of approvedBookings) {
    await booking.update({ status: "completed" });
    await publishBookingEvent("booking.completed", booking);
    await trackBookingEvent("booking.completed", booking);
  }

  const pendingBookings = await Booking.findAll({
    where: {
      status: "pending",
      endTime: { [Op.lt]: now },
    },
  });

  for (const booking of pendingBookings) {
    await booking.update({ status: "no-show" });
    await publishBookingEvent("booking.no_show", booking);
    await trackBookingEvent("booking.no_show", booking);
  }

  return {
    completed: approvedBookings.length,
    noShow: pendingBookings.length,
  };
};
