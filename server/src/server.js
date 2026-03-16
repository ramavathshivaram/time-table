import "dotenv/config";
import http from "http";
import logger from "#configs/logger.js";
import mongoose from "mongoose";

import redis from "#configs/redis.js";
import connectDB from "./shared/configs/mongoDB.js";
import app from "./services/app.js";

import { socketInit } from "./services/socket-service/socket.js";

const server = http.createServer(app);

// Init socket
socketInit(server);

const port = process.env.PORT || 8080;

const serverInit = async () => {
  await connectDB();

  server.listen(port, () => {
    logger.info(`Server started on ${port}`);
  });
};

serverInit();

const gracefulShutdown = () => {
  logger.info("shutting down server...");

  server.close(async () => {
    await redis.disconnect();

    await mongoose.disconnect();

    logger.info("server closed");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
