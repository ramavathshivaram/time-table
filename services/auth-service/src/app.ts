import env from "#configs/env.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import morganMiddleware from "#middlewares/morganMiddleware.js";
import rateLimiterMiddleware, {
  authLimiter,
} from "#middlewares/rateLimiter.js";

import authRouter from "#modules/auth/auth.route.js";
import googleRouter from "#modules/google/google.route.js";
import localRouter from "#modules/local/local.route.js";
import forgotPasswordRouter from "#modules/forgot-password/forgot-password.route.js";
import notFoundRoute from "#middlewares/notFoundRoute.js";
import errorHandler from "#middlewares/errorHandler.js";

const corsOptions = {
  origin: env.ORIGIN,
  credentials: true,
};

const app = express();

app.set("view engine", "ejs");
app.set("trust proxy", 1);

//! Middlewares
app.use(morganMiddleware);
app.use(rateLimiterMiddleware(authLimiter));
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
    memory: process.memoryUsage(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/google", googleRouter);
app.use("/api/local", localRouter);
app.use("/api/password", forgotPasswordRouter);

app.use(errorHandler);
app.use(notFoundRoute);

export default app;
