import { Queue } from "bullmq";

import redis from "#configs/redis.js";
import { Faculty } from "./faculty.model.js";

const queue = new Queue("faculty", {
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

export const facultyQueue = {
  add: async (designerId: string, faculty: Faculty) => {
    return queue.add("create", {
      designerId,
      faculty,
    });
  },

  update: async (faculty: Partial<Faculty>) => {
    return queue.add("update", {
      faculty,
    });
  },

  remove: async (facultyId: string) => {
    return queue.add("delete", {
      facultyId,
    });
  },
};
