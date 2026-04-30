import express from "express";
import cors from "cors";

import bookingRoutes from "./routes/bookingRoutes.js";
import adminBookingRoutes from "./routes/adminBookingRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "booking-analytics-service",
    status: "healthy",
  });
});

app.use("/bookings", bookingRoutes);
app.use("/bookings/admin", adminBookingRoutes);
app.use("/analytics", analyticsRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Booking analytics service route not found",
  });
});

app.use(errorMiddleware);

export default app;
