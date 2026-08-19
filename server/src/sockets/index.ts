import type { Server } from "socket.io";

import { socketAuth } from "#middlewares/socketAuth.middleware.js";
import logger from "#configs/logger.js";
import { socketRegistry } from "./socket-registry.js";
import { registerRoomListeners } from "./listeners/room.listener.js";
import { registerTimetableDesignerListeners } from "./listeners/timetable-designer.socket.js";
import { registerSubjectListeners } from "./listeners/subject.listener.js";

export const registerSocket = (io: Server) => {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    logger.info(`Socket connected: ${socket.id}`);
    socketRegistry.setSocketId(socket.data.user.userId, socket.id);

    registerTimetableDesignerListeners(io, socket);
    registerRoomListeners(io, socket);
    registerSubjectListeners(io, socket);

    socket.on("disconnect", (reason) => {
      logger.info(`Socket disconnected: ${socket.id}`, reason);
      socketRegistry.removeSocketId(socket.data.user.userId);
    });
  });
};
