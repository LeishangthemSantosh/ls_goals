import express from "express";
import cors from "cors";
import appRouter from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import "dotenv/config";

const app = express();

app.use(express.json()); // body-parser for json
app.use(express.urlencoded({ extended: true })); // for form-data

app.use(cors({ origin: process.env.CLIENT_SIDE_BASE_URL }));

app.use("/api/v1", appRouter);

// must be after all routes
// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: "Route not found",
  });
});

// Exception handler
app.use(errorHandler);

export default app;
