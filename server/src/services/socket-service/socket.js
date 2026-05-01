import { Server } from "socket.io";
import onlineUsers from "./onlineUsers.js";
import socketAuthMiddleware from "./middlewares/socketAuthMiddleware.js";

import logger from "#configs/logger.js";
import socketLogger from "./middlewares/socketLogger.js";
import workflowSocket from "./workflow/workflow.socket.js";
import getWorkflowIdFromCookie from "./middlewares/getWorkflowIdCookie.js";
import { removeWorkflowSocket } from "./workflow/workflow.socket.store.js";

let io;

export const socketInit = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(socketLogger);
  io.use(socketAuthMiddleware);
  io.use(getWorkflowIdFromCookie);

  io.on("connection", (socket) => {
    onlineUsers.addUser(socket.userId, socket.id);
    logger.info("User Connected", {
      userId: socket.userId,
      socketId: socket.id,
    });

    //! Init workflow socket
    workflowSocket(io, socket);

    socket.on("disconnect", () => {
      onlineUsers.removeUserBySocketId(socket.id);
      removeWorkflowSocket(socket.id);
      logger.info("User disconnected", {
        userId: socket.userId,
        socketId: socket.id,
      });
    });
  });
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
