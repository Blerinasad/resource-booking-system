import {publishEvent} from "../config/kafka.js";

export const publishBookingEvent = async (eventType, booking) => {
  await publishEvent(eventType, {
    id: booking.id,
    userId: booking.userId,
    resourceId: booking.resourceId,
    status: booking.status,
    startTime: booking.startTime,
    endTime: booking.endTime,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  });
};
