import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    },
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      tokenType: "refresh",
    },
    env.jwtRefreshSecret,
    {
      expiresIn: env.jwtRefreshExpiresIn,
    },
  );
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};
