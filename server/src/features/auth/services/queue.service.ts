import redis from "#configs/redis.js";
import { Queue } from "bullmq";

const emailQueue = new Queue("send-email", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: false,
    priority: 2,
  },
});

export const queueService = {
  forgotPassword: (data: any) => emailQueue.add("forgot-password", data),
};
