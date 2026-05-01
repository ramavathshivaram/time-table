import env from "#configs/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import errorHandler from "#shared/middlewares/errorHandler.js";
import rateLimiter from "#shared/middlewares/rateLimiter.js";
import notFoundRoute from "#shared/middlewares/notFoundRoute.js";
import authenticate from "#shared/middlewares/authenticate.js";
import morganMiddleware from "#shared/middlewares/morganMiddleware.js";

import authRouter from "#services/auth-service/routes/auth.route.js";
import userRouter from "#services/user-service/routes/user.routes.js";
import workflowRouter from "#services/workflow-service/routes/workflow.route.js";
import notificationRouter from "#services/user-service/routes/notification.route.js";

const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:5173",
  credentials: true,
};

const app = express();

app.set("view engine", "ejs");
app.set("trust proxy", 1);

//! Middlewares
app.use(morganMiddleware);
app.use(rateLimiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
    level: 6,
  }),
);

app.get("/", async (req, res) => res.send("API running"));

app.get("/health", async (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

//! Auth Routes
app.use("/api/auth", authRouter);

//! User Routes
app.use("/api/user", authenticate, userRouter);
app.use("/api/notifications", authenticate, notificationRouter);

//! Workflow Routes
app.use("/api/workflow", authenticate, workflowRouter);

//! Route not found
app.use(notFoundRoute);

//! Error Handler
app.use(errorHandler);

export default app;
