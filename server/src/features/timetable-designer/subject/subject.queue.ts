import { Queue } from "bullmq";

import redis from "#configs/redis.js";
import { Subject } from "./subject.model.js";

const queue = new Queue("subject", {
  connection: redis,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 1000,
    },

    removeOnComplete: 100,
    removeOnFail: 500,
  },
});

export const subjectQueue = {
  // -----------------------------------------
  // CREATE
  // -----------------------------------------

  add: async (designerId: string, subject: Subject) => {
    return queue.add("create", {
      designerId,
      subject,
    });
  },

  // -----------------------------------------
  // UPDATE
  // -----------------------------------------

  update: async (subject: Partial<Subject>) => {
    return queue.add("update", {subject});
  },

  // -----------------------------------------
  // DELETE
  // -----------------------------------------

  remove: async (designerId: string, id: string) => {
    return queue.add("delete", {
      designerId,
      id,
    });
  },
};
