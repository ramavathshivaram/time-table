import type { Server, Socket } from "socket.io";

import { asyncSocketHandler } from "../lib/async-socket-handler.js";
import { errors } from "#utils/errors.js";
import { messageService } from "#features/timetable-designer/message.service.js";

export const registerMessageListeners = (io: Server, socket: Socket) => {
  socket.on(
    "message:send",
    asyncSocketHandler("message:send", async (payload) => {
      const { designerId, message } = payload;

      if (!designerId) {
        throw errors.badRequest("Designer ID is required");
      }

      return messageService.create(designerId, message);
    }),
  );
};
