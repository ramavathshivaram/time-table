import messageRepository from "../repositorys/message.repository.js";

const addMessageGRPC = async (workflowId, message) => {
  await messageRepository.addMessage(workflowId, message.role, message.content);
};

const getAllMessagesGRPC = async (workflowId, page, limit) => {
  return await messageRepository.workflowMessages(workflowId, page, limit);
};

export default { addMessageGRPC, getAllMessagesGRPC };
