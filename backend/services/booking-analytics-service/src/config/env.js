import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5003,
  nodeEnv: process.env.NODE_ENV || "development",

  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/smart_booking_analytics",
  jwtSecret: process.env.JWT_SECRET,

  services: {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
    resource: process.env.RESOURCE_SERVICE_URL || "http://localhost:5002",
  },
};
