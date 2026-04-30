import cron from "node-cron";
import { updateExpiredBookings } from "../services/bookingStatusService.js";

export const startBookingStatusJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const result = await updateExpiredBookings();
      console.log("Booking status job executed", result);
    } catch (error) {
      console.error("Booking status job failed:", error.message);
    }
  });

  console.log("Booking status cron job started");
};
