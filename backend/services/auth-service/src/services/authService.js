import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "./passwordService.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./tokenService.js";

const createAuthPayload = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const refreshTokenHash = await hashPassword(refreshToken);

  await user.update({
    refreshTokenHash,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return await createAuthPayload(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (user.status !== "active") {
    const error = new Error("User account is inactive");
    error.statusCode = 403;
    throw error;
  }

  return await createAuthPayload(user);
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token missing");
    error.statusCode = 401;
    throw error;
  }

  const decoded = verifyRefreshToken(refreshToken);

  if (decoded.tokenType !== "refresh") {
    const error = new Error("Invalid token type");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findByPk(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.status !== "active") {
    const error = new Error("User account is inactive");
    error.statusCode = 403;
    throw error;
  }

  if (!user.refreshTokenHash) {
    const error = new Error("Refresh token is no longer valid");
    error.statusCode = 401;
    throw error;
  }

  const isRefreshTokenValid = await comparePassword(
    refreshToken,
    user.refreshTokenHash,
  );

  if (!isRefreshTokenValid) {
    await user.update({ refreshTokenHash: null });

    const error = new Error("Refresh token reuse detected. Session revoked.");
    error.statusCode = 401;
    throw error;
  }

  return await createAuthPayload(user);
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findByPk(decoded.id);

    if (user) {
      await user.update({
        refreshTokenHash: null,
      });
    }
  } catch {
    return;
  }
};
