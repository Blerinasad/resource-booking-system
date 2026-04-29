import express from "express";
import cors from "cors";
import resourceRoutes from "./routes/resourceRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "resource-service",
    status: "healthy",
  });
});

app.use("/resources", resourceRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource service route not found",
  });
});

app.use(errorMiddleware);

export default app;
