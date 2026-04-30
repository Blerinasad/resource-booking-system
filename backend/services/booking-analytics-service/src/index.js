import app from "./app.js";
import sequelize from "./config/mysql.js";
import { connectMongo } from "./config/mongo.js";
import env from "./config/env.js";
import kafkaClient from "./config/kafka.js";
import { startBookingStatusJob } from "./jobs/bookingStatusJob.js";
import { startBookingConsumer } from "./events/bookingConsumer.js";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully");

    await sequelize.sync({ alter: true });
    console.log("Booking database synced successfully");

    await connectMongo();
    await kafkaClient.connect();
    await startBookingConsumer();

    startBookingStatusJob();

    app.listen(env.port, () => {
      console.log(`Booking analytics service running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start booking analytics service:", error.message);
    process.exit(1);
  }
};

startServer();
