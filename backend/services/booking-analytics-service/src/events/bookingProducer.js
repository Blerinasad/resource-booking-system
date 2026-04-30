import kafkaClient from "../config/kafka.js";

export const publishBookingEvent = async (eventType, booking) => {
  await kafkaClient.publish(eventType, {
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
