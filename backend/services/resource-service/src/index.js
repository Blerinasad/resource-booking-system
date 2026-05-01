import app from "./app.js";
import sequelize from "./config/db.js";
import env from "./config/env.js";
import { connectProducer } from "./config/kafka.js";
import connectWithRetry from "./utils/connectWithRetry.js";

const startServer = async () => {
  try {
    console.log("RESOURCE JWT SECRET LOADED:", env.jwtSecret ? "YES" : "NO");
    await connectWithRetry(sequelize);

  
    await sequelize.sync({ alter: true });
    console.log("Resource database synced successfully");

    await connectProducer();

    app.listen(env.port, () => {
      console.log(`Resource service running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start auth service:", error);
    process.exit(1);
  }
};

startServer();
