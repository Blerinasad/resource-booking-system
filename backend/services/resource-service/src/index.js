import app from "./app.js";
import sequelize from "./config/db.js";
import env from "./config/env.js";
import kafkaClient from "./config/kafka.js";

const startServer = async () => {
  try {
    console.log("RESOURCE JWT SECRET LOADED:", env.jwtSecret ? "YES" : "NO");

    await sequelize.authenticate();
    console.log("MySQL connected successfully");

    await sequelize.sync({ alter: true });
    console.log("Resource database synced successfully");

    await kafkaClient.connect();

    app.listen(env.port, () => {
      console.log(`Resource service running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start resource service:", error.message);
    process.exit(1);
  }
};

startServer();
