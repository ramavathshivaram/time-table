import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import cors from "cors";

import errorHandler from "../shared/middlewares/errorHandler.js";
import notFoundRoute from "../shared/middlewares/notFoundRoute.js";
import verifyJwtToken from "../shared/middlewares/verifyJwtToken.js";

import authRouter from "./auth-service/routes/auth.route.js";
import userRouter from "./user-service/routes/user.routes.js";
import workflowRouter from "./workflow-service/routes/workflow.route.js";

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

//! User Routes
app.use("/user", verifyJwtToken, userRouter);

//! Workflow Routes
app.use("/workflow", verifyJwtToken, workflowRouter);

//! Route not found
app.use(notFoundRoute);

// Error Handler
app.use(errorHandler);

export default app;
