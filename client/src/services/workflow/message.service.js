import useWorkflowStore from "@/store/workflow.store";
import { sendMessageEmit } from "@/services/socket/workflow/emitters/message.emit";

const messageService = {
  sendMessage(message) {
    const { workflowId } = useWorkflowStore.getState();
    sendMessageEmit(workflowId, message);

    useWorkflowStore.setState((state) => ({
      messages: [...state.messages, message],
    }));
  },

  responseMessage(message) {
    useWorkflowStore.setState((state) => ({
      messages: [...state.messages, message],
    }));
  },
};

export default messageService;