import type { Server } from "socket.io";

import logger from "#configs/logger.js";
import { socketAuth } from "#middlewares/socketAuth.middleware.js";

import { socketRegistry } from "./socket-registry.js";

import {
  registerFacultyListeners,
  registerRoomListeners,
  registerSubjectListeners,
  registerTimetableDesignerListeners,
  registerNodeListeners,
  registerEdgeListeners
} from "./listeners/index.js";

export const registerSocket = (io: Server) => {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    const userId = socket.data.user.userId;

    logger.info(`Socket connected: ${socket.id}`);

    socketRegistry.setSocketId(userId, socket.id);

    registerTimetableDesignerListeners(io, socket);
    registerNodeListeners(io, socket);
    registerEdgeListeners(io, socket);
    registerFacultyListeners(io, socket);
    registerSubjectListeners(io, socket);
    registerRoomListeners(io, socket);

    socket.on("disconnect", (reason) => {
      logger.info(`Socket disconnected: ${socket.id} | reason=${reason}`);

      socketRegistry.removeSocketId(userId);
    });
  });
};
