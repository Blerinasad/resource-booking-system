import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || "development",

  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  refreshCookieName: process.env.REFRESH_COOKIE_NAME || "refreshToken",
};
