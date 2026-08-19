import { Queue } from "bullmq";

import redis from "#configs/redis.js";

import type { Node } from "./node.model.js";

const queue = new Queue("node", {
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

export const nodeQueue = {
  add: async (designerId: string, node: Node) => {
    return queue.add("create", {
      designerId,
      node,
    });
  },

  addMany: async (designerId: string, nodes: Node[]) => {
    return queue.add("createMany", {
      designerId,
      nodes,
    });
  },

  update: async (node: Node) => {
    return queue.add("update", {
      node,
    });
  },

  remove: async (designerId: string, nodeId: string) => {
    return queue.add("delete", {
      designerId,
      nodeId,
    });
  },

  removeMany: async (designerId: string, nodeIds: string[]) => {
    return queue.add("deleteMany", {
      designerId,
      nodeIds,
    });
  },
};
