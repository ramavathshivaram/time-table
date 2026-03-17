import messageRepository from "../repositorys/message.repository.js";

const sendMessageGRPC = async (workflowId, message) => {
  await messageRepository.sendMessage(workflowId, message);
};

export default { sendMessageGRPC };
