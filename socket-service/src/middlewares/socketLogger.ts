import logger from "#configs/logger.js";
import type { Socket } from "socket.io";

const socketLogger = (socket: Socket, next: (err?: Error) => void) => {
  console.log(`🔌 New connection: ${socket.id}`);
  socket.use(([event, ...args], nextMiddleware) => {
    logger.info(`SOCKET EVENT: ${event}`, args);
    nextMiddleware();
  });

  next();
};

export default socketLogger;
