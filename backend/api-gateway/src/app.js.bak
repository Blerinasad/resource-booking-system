import express from "express";
import cors from "cors";
import morgan from "morgan";

import proxyRoutes from "./routes/proxyRoutes.js";
import rateLimitMiddleware from "./middleware/rateLimitMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(rateLimitMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "api-gateway",
    status: "healthy",
  });
});

app.use("/api", proxyRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Gateway route not found",
  });
});

app.use(errorMiddleware);

export default app;