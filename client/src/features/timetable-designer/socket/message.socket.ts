import { emitAsync } from "@/shared/socket/emit-async";
import type { Message } from "../types";

export const messageSocket = {
  send: (designerId: string, msg: Message) => {
    return emitAsync<Message>("message:send", {
      designerId,
      message: msg,
    });
  },
};
