import { generateMessageId } from "#utils/generate-ids.js";

import { messageEmitter } from "./message.emiter.js";

export const messageService = {
  async create(userId: string, designerId: string, message: string) {
    console.log("message", message);

    const messageId = generateMessageId();

    await messageEmitter.start(userId, {
      messageId,
    });

    let seq = 0;

    const interval = setInterval(async () => {
      await messageEmitter.token(userId, {
        messageId,
        content: "Hello ",
        seq: seq++,
        timestamp: Date.now(),
      });
    }, 50);

    setTimeout(async () => {
      clearInterval(interval);

      await messageEmitter.finish(userId, {
        messageId,
      });
    }, 5000);
  },
};
