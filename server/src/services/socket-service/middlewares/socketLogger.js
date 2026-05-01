import logger from "#configs/logger.js";

const socketLogger = (socket, next) => {
  console.log(`🔌 New connection: ${socket.id}`);
  
  // Log incoming events
  socket.use(([event, ...args], nextMiddleware) => {
    logger.info(`SOCKET EVENT: ${event}`, args);
    nextMiddleware();
  });

  next();
};

export default socketLogger;