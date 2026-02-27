import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Auth Routes
app.use("/auth", authRouter);

// Route not found
app.use((req, res) => {
  console.log("Route not found");
  res.status(404).json({
    message: "Route not found",
    success: false,
  });
});

// Error Handler
app.use(errorHandler);

export default app;
