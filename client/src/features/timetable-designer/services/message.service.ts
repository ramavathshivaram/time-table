import { messageSocket } from "../socket/message.socket";
import { useDesignerStore } from "../store/designer.store";
import { useMessageStore } from "../store/message.store";
import type { Message } from "../types";

export const messageService = {
  send(message: Message) {
    useMessageStore.getState().send(message);
    messageSocket.send(useDesignerStore.getState().designerId, message);
  },
};
