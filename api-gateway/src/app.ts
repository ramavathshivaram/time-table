import type { Request } from "express";

import env from "#configs/env.js";
import express from "express";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";

import morganMiddleware from "#middlewares/morganMiddleware.js";
import errorHandler from "#middlewares/errorHandler.js";
import notFoundRoute from "#middlewares/notFoundRoute.js";

const corsOptions = {
  origin: env.ORIGIN,
  credentials: true,
};

interface ProxyOptions {
  proxyReqPathResolver: (req: Request) => string;
  proxyReqOptDecorator: (proxyReqOpts: any, srcReq: Request) => any;
}

const proxyOptions: ProxyOptions = {
  proxyReqPathResolver: (req: Request): string => `/api${req.url}`,

  proxyReqOptDecorator: (proxyReqOpts: any, srcReq: Request) => {
    proxyReqOpts.headers = proxyReqOpts.headers || {};

    proxyReqOpts.headers["Authorization"] =
      srcReq.headers["authorization"] ?? "";

    proxyReqOpts.headers["Cookie"] = srcReq.headers["cookie"] ?? "";

    return proxyReqOpts;
  },
};

const socketProxy = createProxyMiddleware({
  target: env.SOCKET_SERVICE_URL,
  changeOrigin: true,
  ws: true,
  timeout: 60000,
  proxyTimeout: 60000,
});

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

app.use("/api/auth", proxy(env.AUTH_SERVICE_URL, proxyOptions));
app.use("/api/user", proxy(env.USER_SERVICE_URL, proxyOptions));
app.use("/api/workflow", proxy(env.WORKFLOW_SERVICE_URL, proxyOptions));
app.use("/socket.io/", socketProxy);

app.use(errorHandler);
app.use(notFoundRoute);

export default app;
