import http from "http";

import env from "#configs/env.js";
import logger from "#configs/logger.js";
import connectDB, { disconnectDB } from "#configs/mongoDB.js";
import { checkRedis, disconnectRedis } from "#configs/redis.js";

import app from "./app.js";

const server = http.createServer(app);

let isShuttingDown = false;

const serverInit = async () => {
  try {
    logger.info("Starting server...");

    await checkRedis();
    await connectDB();

    server.listen(env.PORT, () => {
      logger.info(`Server started on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Server startup failed", error);

    process.exit(1);
  }
};

serverInit();
