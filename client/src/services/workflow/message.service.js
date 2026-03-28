import useWorkflowStore from "@/store/workflow.store";
import {
  getAllMessagesEmit,
  sendMessageEmit,
} from "@/services/socket/workflow/emitters/message.emit";

const messageService = {
  sendMessage(message) {
    sendMessageEmit(message);

    useWorkflowStore.getState().addMessageLocal(message);
  },

  responseMessage(message) {
    useWorkflowStore.getState().addMessageLocal(message);
  },

  getAllMessages(page, limit, callback) {
    getAllMessagesEmit(page, limit, (messages, hasMore) => {
      useWorkflowStore.getState().addMessagesLocal(messages);
      callback(hasMore);
    });
  },
};

export default messageService;
