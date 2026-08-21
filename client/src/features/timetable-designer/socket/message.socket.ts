import { emitAsync } from "@/shared/socket/emit-async";
import type { Message } from "../types";

export const messageSocket = {
  send: (message: Message) => {
    return emitAsync<Message>("message:send", {
      message,
    });
  },
};
