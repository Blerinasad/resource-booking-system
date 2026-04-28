import rateLimit from "express-rate-limit";
import env from "../config/env.js";

const rateLimitMiddleware = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export default rateLimitMiddleware;