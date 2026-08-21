import { DESIGNER_TTL, PAGE_SIZE } from "#configs/constants.js";
import redis from "#configs/redis.js";
import { Message } from "./message.model.js";

const getKey = (designerId: string) => `messages:${designerId}`;

export const messageCache = {
  async push(designerId: string, message: Message) {
    const key = getKey(designerId);

    await redis.rpush(key, JSON.stringify(message));
    await redis.expire(key, DESIGNER_TTL);
  },

  async update(designerId: string, messageId: string, content: string) {
    const key = getKey(designerId);

    const messages = await redis.lrange(key, 0, -1);

    const index = messages.findIndex((value) => {
      const message = JSON.parse(value);
      return message.id === messageId;
    });

    if (index === -1) {
      return false;
    }

    const message = JSON.parse(messages[index]);

    message.content += content;

    await redis.lSet(key, index, JSON.stringify(message));

    return true;
  },

  async get(designerId: string, page = 1) {
    const key = getKey(designerId);

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    const messages = await redis.lrange(key, start, end);

    return messages.map((message) => JSON.parse(message));
  },

  async clear(designerId: string) {
    await redis.del(getKey(designerId));
  },

  async remove(designerId: string) {
    await redis.del(getKey(designerId));
  },

  async exists(designerId: string) {
    return redis.exists(getKey(designerId));
  },
};
