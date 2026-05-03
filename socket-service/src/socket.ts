import http from "http";
import env from "#configs/env.js";
import { Server } from "socket.io";
import authenticate from "#middlewares/authenticate.js";

import logger from "#configs/logger.js";
import socketLogger from "#middlewares/socketLogger.js";
import registerWorkflowHandlers from "./workflow/registerWorkflowHandlers.js";
import workflowSocketStore from "./workflow/workflow.socket.store.js";

let io;
export const socketInit = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: env.ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(socketLogger);
  io.use(authenticate);

  io.on("connection", (socket) => {
    logger.info("User Connected", {
      userId: socket.userId,
      socketId: socket.id,
    });

    //! Init workflow socket
    registerWorkflowHandlers(socket);

    socket.on("disconnect", () => {
      workflowSocketStore.remove(socket.id);
      logger.info("User disconnected", {
        userId: socket.userId,
        socketId: socket.id,
      });
    });
  });
};

export const getIo = () => io;