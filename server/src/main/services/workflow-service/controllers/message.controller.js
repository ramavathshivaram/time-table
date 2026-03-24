import messageRepository from "../repositorys/message.repository.js";

const addMessageGRPC = async (workflowId, message) => {
  await messageRepository.addMessage(workflowId, message.role, message.content);
};

const getAllMessagesGRPC = async (workflowId, offset, limit) => {
  return await messageRepository.workflowMessages(workflowId, offset, limit);
};

export default { addMessageGRPC, getAllMessagesGRPC };
