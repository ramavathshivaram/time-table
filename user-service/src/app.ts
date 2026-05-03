import env from "#configs/env.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import morganMiddleware from "#middlewares/morganMiddleware.js";
import errorHandler from "#middlewares/errorHandler.js";
import notFoundRoute from "#middlewares/notFoundRoute.js";

import userRouer from "./modules/user/user.routes.js";

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

app.get("/", async (req, res) => res.send("API running"));

app.get("/health", async (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    memory: process.memoryUsage(),
  });
});

app.use("/api/user", userRouer);

app.use(errorHandler);
app.use(notFoundRoute);

export default app;
