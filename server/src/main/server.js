import "dotenv/config";
import http from "http";
import mongoose from "mongoose";

import logger from "#configs/logger.js";
import env from "#configs/env.js";
import redis, { checkRedis, disconnectRedis } from "#configs/redis.js";

import connectDB from "#configs/mongoDB.js";
import app from "./app.js";
import { socketInit } from "#services/socket-service/socket.js";

const server = http.createServer(app);

// Init socket
socketInit(server);

const serverInit = async () => {
  try {
    logger.info("Starting server...");

    await checkRedis();
    await connectDB();

    server.listen(env.PORT, () => {
      logger.info(`Server started on ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Server startup failed", error);
    process.exit(1);
  }
};

serverInit();

const gracefulShutdown = async () => {
  try {
    logger.info("Shutting down server...");

    server.close(async () => {
      await disconnectRedis();
      await mongoose.disconnect();

      logger.info("Server closed");
      process.exit(0);
    });
  } catch (err) {
    logger.error("Shutdown error", err);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
