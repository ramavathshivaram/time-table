import { messageSocket } from "../socket/message.socket";
import { useDesignerStore } from "../store/designer.store";
import { useMessageStore } from "../store/message.store";
import type { Message } from "../types";
import { generateMessageId } from "../utils/generate-ids";

export const messageService = {
  send(content: string): void | Promise<void> {
    const message: Message = {
      id: generateMessageId(),
      designerId: useDesignerStore.getState().designerId,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    useMessageStore.getState().send(message);
    messageSocket.send(message);
  },
};
