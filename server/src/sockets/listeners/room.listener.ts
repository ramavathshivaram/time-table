import type { Server, Socket } from "socket.io";

import { roomService } from "#features/timetable-designer/room/room.service.js";
import { asyncSocketHandler } from "../lib/async-socket-handler.js";
import { errors } from "#utils/errors.js";

export const registerRoomListeners = (io: Server, socket: Socket) => {
  socket.on(
    "room:create",
    asyncSocketHandler("room:create", async (payload, callback) => {
      const { designerId, room } = payload;

      const createdRoom = await roomService.create(designerId, room);

      callback({
        success: true,
        data: createdRoom,
      });
    }),
  );

  socket.on(
    "room:update",
    asyncSocketHandler("room:update", async (payload, callback) => {
      const { designerId, roomId, data } = payload;

      const updatedRoom = await roomService.update(designerId, roomId, data);

      if (!updatedRoom) {
        throw errors.internal("Failed to update room");
      }

      callback({
        success: true,
        data: updatedRoom,
      });
    }),
  );

  socket.on(
    "room:delete",
    asyncSocketHandler("room:delete", async (payload, callback) => {
      const { designerId, roomId } = payload;

      const deleted = await roomService.delete(designerId, roomId);

      if (!deleted) {
        throw errors.internal("Failed to delete room");
      }

      callback({
        success: true,
        data: {
          roomId,
        },
      });
    }),
  );
};
