import MessageModel from "../models/message.model.js";
import logger from "#configs/logger.js";

const addMessage = async (workflowId, role, content) => {
  try {
    return await MessageModel.create({ workflowId, role, content });
  } catch (error) {
    logger.error("Error in addMessage", {
      workflowId,
      role,
      error: error.message,
    });
    return null;
  }
};

const workflowMessages = async (workflowId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    // 🔥 run queries in parallel (faster)
    const [messages, total] = await Promise.all([
      MessageModel.find({ workflowId })
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      MessageModel.countDocuments({ workflowId }),
    ]);

    const hasMore = skip + messages.length < total;

    return {
      messages,
      hasMore,
      total,
      page,
    };
  } catch (error) {
    logger.error("Error in workflowMessages", {
      workflowId,
      page,
      limit,
      error: error.message,
    });

    return {
      messages: [],
      hasMore: false,
      total: 0,
      page,
    };
  }
};

export default { addMessage, workflowMessages };
