import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import services from "../config/services.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(
  "/auth",
  createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
    pathRewrite: (path) => `/auth${path}`,
  }),
);

router.use(
  "/users",
  authMiddleware,
  createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
    pathRewrite: (path) => `/users${path}`,
  }),
);

router.use(
  "/resources",
  authMiddleware,
  createProxyMiddleware({
    target: services.resource,
    changeOrigin: true,
    pathRewrite: (path) => `/resources${path}`,
  }),
);

router.use(
  "/bookings/admin",
  authMiddleware,
  roleMiddleware("admin"),
  createProxyMiddleware({
    target: services.booking,
    changeOrigin: true,
    pathRewrite: (path) => `/bookings/admin${path}`,
  }),
);

router.use(
  "/bookings",
  authMiddleware,
  createProxyMiddleware({
    target: services.booking,
    changeOrigin: true,
    pathRewrite: (path) => `/bookings${path}`,
  }),
);

router.use(
  "/analytics",
  authMiddleware,
  roleMiddleware("admin"),
  createProxyMiddleware({
    target: services.booking,
    changeOrigin: true,
    pathRewrite: (path) => `/analytics${path}`,
  }),
);

export default router;
