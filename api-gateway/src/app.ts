import env from "#configs/env.js";
import express from "express";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import morganMiddleware from "#middlewares/morganMiddleware.js";
import errorHandler from "#middlewares/errorHandler.js";
import notFoundRoute from "#middlewares/notFoundRoute.js";

const corsOptions = {
  origin: env.ORIGIN,
  credentials: true,
};

const app = express();

//! Middlewares
app.use(morganMiddleware);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => res.send("API running"));

app.get("/health", async (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    memory: process.memoryUsage(),
  });
});

app.use("/api/auth", proxy(env.AUTH_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api${req.url}`,
}));

app.use(errorHandler);
app.use(notFoundRoute);

export default app;
