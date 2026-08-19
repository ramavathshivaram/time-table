import type { Server, Socket } from "socket.io";

import logger from "#configs/logger.js";

import { timetableDesignerService } from "#features/timetable-designer/timetable-designer.service.js";

export const registerTimetableDesignerListeners = (
  io: Server,
  socket: Socket,
) => {
  socket.on("timetable-designer:get", async (payload, callback) => {
    try {
      const { timetableId } = payload;

      if (!timetableId) {
        callback?.({
          success: false,
          message: "Timetable ID is required",
        });

        return;
      }

      const timetableDesigner =
        await timetableDesignerService.getOrCreate(timetableId);

      console.log(timetableDesigner);

      callback?.({
        success: true,
        data: timetableDesigner,
      });
    } catch (error) {
      logger.error("timetable-designer:get failed", error);

      callback?.({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get timetable designer",
      });
    }
  });
};
