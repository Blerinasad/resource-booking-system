import app from "./app.js";
import sequelize from "./config/db.js";
import env from "./config/env.js";
import connectWithRetry from "./utils/connectWithRetry.js";

const startServer = async () => {
  try {
    await connectWithRetry(sequelize);


    await sequelize.sync();
    console.log("Database synced successfully");

    app.listen(env.port, () => {
      console.log(`Auth service running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start auth service:", error);
    process.exit(1);
  }
};

startServer();
