import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "auth-service",
    status: "healthy",
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Auth service route not found",
  });
});

app.use(errorMiddleware);

export default app;
