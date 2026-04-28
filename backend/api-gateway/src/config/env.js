import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  services: {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
    resource: process.env.RESOURCE_SERVICE_URL || "http://localhost:5002",
    booking: process.env.BOOKING_SERVICE_URL || "http://localhost:5003",
  },

  jwtSecret: process.env.JWT_SECRET || "supersecretkey",

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
  },
};

export default env;