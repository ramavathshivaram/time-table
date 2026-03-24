import MessageModel from "../models/message.model.js";

const addMessage = async (workflowId, role, content) => {
  return await MessageModel.create({ workflowId, role, content });
};

const workflowMessages = async (workflowId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return MessageModel.find({ workflowId })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

export default { addMessage, workflowMessages };
