import app from "./app.js";
import sequelize from "./config/db.js";
import env from "./config/env.js";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully");

    await sequelize.sync();
    console.log("Database synced successfully");

    app.listen(env.port, () => {
      console.log(`Auth service running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start auth service:", error.message);
    process.exit(1);
  }
};

startServer();
