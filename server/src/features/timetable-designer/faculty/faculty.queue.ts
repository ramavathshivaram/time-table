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

  update: async (designerId: string, id: string, data: Partial<Faculty>) => {
    return queue.add("update", {
      designerId,
      id,
      data,
    });
  },

  remove: async (designerId: string, id: string) => {
    return queue.add("delete", {
      designerId,
      id,
    });
  },
};
