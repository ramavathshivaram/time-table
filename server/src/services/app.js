import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import cors from "cors";

import errorHandler from "../shared/middlewares/errorHandler.js";
import notFoundRoute from "../shared/middlewares/notFoundRoute.js";

import authRouter from "./auth-service/routes/auth.route.js";

const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:5173",
  credentials: true,
};

const app = express();

app.set("view engine", "ejs");

//! Middlewares
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//! Auth Routes
app.use("/auth", authRouter);

//! Route not found
app.use(notFoundRoute);

// Error Handler
app.use(errorHandler);

export default app;
