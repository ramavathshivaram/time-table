import env from "#configs/env.js";
import http from "http";
import logger from "#configs/logger.js";

import app from "./app.js";
import { socketInit } from "./socket.js";

const server = http.createServer(app);

socketInit(server);

const serverInit = async () => {
  try {
    logger.info("Starting server...");

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

    if (server) {
      server.close(async () => {
        logger.info("Server closed");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (err) {
    logger.error("Shutdown error", err);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
