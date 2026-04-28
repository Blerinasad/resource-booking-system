import env from "../config/env.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../services/authService.js";

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const setRefreshCookie = (res, refreshToken) => {
  res.cookie(env.refreshCookieName, refreshToken, cookieOptions);
};

const clearRefreshCookie = (res) => {
  res.clearCookie(env.refreshCookieName, cookieOptions);
};

export const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);

    setRefreshCookie(res, result.refreshToken);
    delete result.refreshToken;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    setRefreshCookie(res, result.refreshToken);
    delete result.refreshToken;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies?.[env.refreshCookieName];

    const result = await refreshAccessToken(oldRefreshToken);

    setRefreshCookie(res, result.refreshToken);
    delete result.refreshToken;

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: result,
    });
  } catch (error) {
    clearRefreshCookie(res);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.[env.refreshCookieName];

    await logoutUser(refreshToken);

    clearRefreshCookie(res);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
