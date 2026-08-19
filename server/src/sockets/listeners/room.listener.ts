import type { Server, Socket } from "socket.io";

import logger from "#configs/logger.js";
import { roomService } from "#features/timetable-designer/room/room.service.js";

export const registerRoomListeners = (io: Server, socket: Socket) => {
  socket.on("room:create", async (payload, callback) => {
    try {
      logger.info("room:create");
      const { designerId, room } = payload;

      const createdRoom = await roomService.create(designerId, room);

      callback?.({
        success: true,
        data: createdRoom,
      });
    } catch (error) {
      logger.error("room:create failed", error);

      callback?.({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create room",
      });
    }
  });

  socket.on("room:update", async (payload, callback) => {
    try {
      logger.info("room:update");
      const { designerId, roomId, data } = payload;

      const updatedRoom = await roomService.update(designerId, roomId, data);

      if (!updatedRoom) {
        callback?.({
          success: false,
          message: "Room not found",
        });

        return;
      }

      callback?.({
        success: true,
        data: updatedRoom,
      });
    } catch (error) {
      logger.error("room:update failed", error);

      callback?.({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update room",
      });
    }
  });

  socket.on("room:delete", async (payload, callback) => {
    try {
      logger.info("room:delete");
      const { designerId, roomId } = payload;

      const deleted = await roomService.delete(designerId, roomId);

      if (!deleted) {
        callback?.({
          success: false,
          message: "Room not found",
        });

        return;
      }

      callback?.({
        success: true,
        data: {
          roomId,
        },
      });
    } catch (error) {
      logger.error("room:delete failed", error);

      callback?.({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete room",
      });
    }
  });
};
