import { Server } from "socket.io";
import onlineUsers from "./onlineUsers.js";
import getUserIdFromCookie from "./middlewares/getUserIdFromCookie.js";

import workflowSocket from "./workflow/workflow.socket.js";
import getWorkflowIdFromCookie from "./middlewares/getWorkflowIdCookie.js";
import { removeWorkflowSocket } from "./workflow/workflow.socket.store.js";
import logger from "#configs/logger.js";

let io;

export const socketInit = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(getUserIdFromCookie);
  io.use(getWorkflowIdFromCookie);

  io.on("connection", (socket) => {
    onlineUsers.addUser(socket.userId, socket.id);
    logger.info(`User connected: ${socket.userId} ${socket.id}`);

    //! Init workflow socket
    workflowSocket(io, socket);

    socket.on("disconnect", () => {
      onlineUsers.removeUserBySocketId(socket.id);
      removeWorkflowSocket(socket.id);
      logger.info("User disconnected:", socket.userId, socket.id);
    });
  });
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
