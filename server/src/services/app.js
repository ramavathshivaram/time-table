import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import errorHandler from "../shared/middlewares/errorHandler.js";
import notFoundRoute from "../shared/middlewares/notFoundRoute.js";
import authenticate from "../shared/middlewares/authenticate.js";

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
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
    level: 6,
  }),
);

app.get("/", async (req, res) => res.send("Hello World"));

app.get("/health", async (req, res) => res.send("Healthy"));

//! Auth Routes
app.use("/auth", authRouter);

//! User Routes
app.use("/user", authenticate, userRouter);

//! Workflow Routes
app.use("/workflow", authenticate, workflowRouter);

//! Route not found
app.use(notFoundRoute);

// Error Handler
app.use(errorHandler);

export default app;
