import app from "./app.js";
import sequelize from "./config/mysql.js";
import { connectMongo } from "./config/mongo.js";
import env from "./config/env.js";
import { connectProducer } from "./config/kafka.js";
import { startBookingStatusJob } from "./jobs/bookingStatusJob.js";
import { startBookingConsumer } from "./events/bookingConsumer.js";
import connectWithRetry from "./utils/connectWithRetry.js";

const startServer = async () => {
  try {
    await connectWithRetry(sequelize);


    await sequelize.sync({ alter: true });
    console.log("Booking database synced successfully");

    await connectMongo();
    await connectProducer();
    await startBookingConsumer();

    startBookingStatusJob();

    app.listen(env.port, () => {
      console.log(`Booking analytics service running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start auth service:", error);
    process.exit(1);
  }
};

startServer();
