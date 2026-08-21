import { generateMessageId } from "#utils/generate-ids.js";

import { messageEmitter } from "../message/message.emiter.js";
import { Message } from "../message/message.model.js";
import { messageService } from "../message/message.service.js";

export const aiService = {
  async run(userId: string, designerId: string, message: Message) {
    const messageId = generateMessageId();

    await messageService.create({
      ...message,
      id: message.id,
      designerId,
      role: "user",
    });

    await messageEmitter.start(userId, {
      messageId,
    });

    try {
      let seq = 0;
      let content = "";

      for (let i = 0; i < 100; i++) {
        const token = `ai-${i}\n`;

        content += token;

        await messageEmitter.token(userId, {
          messageId,
          content: token,
          seq: seq++,
          timestamp: Date.now(),
        });
      }

      await messageService.create({
        id: messageId,
        designerId,
        content,
        role: "assistant",
      });

      await messageEmitter.finish(userId, {
        messageId,
      });
    } catch (error) {
      await messageEmitter.error(userId, {
        message: error instanceof Error ? error.message : "AI execution failed",
      });

      throw error;
    }
  },
};
