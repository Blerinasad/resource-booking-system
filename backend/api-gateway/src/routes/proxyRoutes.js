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
    pathRewrite: {
      "^/auth": "/auth",
    },
  })
);

router.use(
  "/resources/admin",
  authMiddleware,
  roleMiddleware("admin"),
  createProxyMiddleware({
    target: services.resource,
    changeOrigin: true,
  })
);

router.use(
  "/resources",
  authMiddleware,
  createProxyMiddleware({
    target: services.resource,
    changeOrigin: true,
  })
);

router.use(
  "/bookings/admin",
  authMiddleware,
  roleMiddleware("admin"),
  createProxyMiddleware({
    target: services.booking,
    changeOrigin: true,
  })
);

router.use(
  "/bookings",
  authMiddleware,
  createProxyMiddleware({
    target: services.booking,
    changeOrigin: true,
  })
);

router.use(
  "/analytics",
  authMiddleware,
  roleMiddleware("admin"),
  createProxyMiddleware({
    target: services.booking,
    changeOrigin: true,
  })
);

export default router;