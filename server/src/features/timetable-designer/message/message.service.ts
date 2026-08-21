import { messageCache } from "./message.cache.js";
import { Message } from "./message.model.js";

export const messageService = {
  async create(message: Partial<Message>) {
    await messageCache.push(message.designerId as string, message);

    return message;
  },

  async update(designerId: string, messageId: string, content: string) {
    await messageCache.update(designerId, messageId, content);
  },

  async get(designerId: string, page = 1) {
    return messageCache.get(designerId, page);
  },
};
