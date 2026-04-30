import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
  const gatewayUserId = req.headers["x-user-id"];
  const gatewayUserRole = req.headers["x-user-role"];
  const gatewayUserEmail = req.headers["x-user-email"];

  if (gatewayUserId && gatewayUserRole) {
    req.user = {
      id: Number(gatewayUserId),
      role: gatewayUserRole,
      email: gatewayUserEmail,
    };

    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Access denied. Token missing."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token."));
  }
};

export default authMiddleware;
