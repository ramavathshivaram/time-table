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

  getAllMessages(page, limit) {
    getAllMessagesEmit(page, limit, (messages) =>
      useWorkflowStore.getState().addMessagesLocal(messages),
    );
  },
};

export default messageService;
