import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
  })
);

router.use(
  "/resources",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
  })
);

router.use(
  "/bookings",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
  })
);

export default router;