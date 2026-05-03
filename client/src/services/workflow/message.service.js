import useWorkflowStore from "@/store/workflow.store.js";
import {messageEmit} from "@/services/socket/workflow/message.socket.js";

const messageService = {
  sendMessage(message) {
    messageEmit.send(message);

    useWorkflowStore.getState().addMessageLocal(message);
  },

  responseMessage(message) {
    useWorkflowStore.getState().addMessageLocal(message);
  },

  getAllMessages(page, limit, callback) {
    messageEmit.getAll(page, limit, (messages, hasMore) => {
      useWorkflowStore.getState().addMessagesLocal(messages);
      callback(hasMore);
    });
  },
};

export default messageService;
