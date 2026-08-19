import { Queue } from "bullmq";

import redis from "#configs/redis.js";

import type { Edge } from "./edge.model.js";

const queue = new Queue("edge", {
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

export const edgeQueue = {
  add: async (designerId: string, edge: Edge) => {
    return queue.add("create", {
      designerId,
      edge,
    });
  },

  addMany: async (designerId: string, edges: Edge[]) => {
    return queue.add("createMany", {
      designerId,
      edges,
    });
  },

  remove: async (designerId: string, edgeId: string) => {
    return queue.add("delete", {
      designerId,
      edgeId,
    });
  },

  removeMany: async (designerId: string, edgeIds: string[]) => {
    return queue.add("deleteMany", {
      designerId,
      edgeIds,
    });
  },
};
