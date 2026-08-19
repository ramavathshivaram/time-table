import { Queue } from "bullmq";

import redis from "#configs/redis.js";
import { Room } from "./room.model.js";

const queue = new Queue("room", {
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

export const roomQueue = {
  add: async (designerId: string, room: Room) => {
    return queue.add("create", {
      designerId,
      room,
    });
  },

  update: async (designerId: string, room: Partial<Room>) => {
    return queue.add("update", {
      designerId,
      room,
    });
  },

  remove: async (designerId: string, id: string) => {
    return queue.add("remove", {
      designerId,
      id,
    });
  },
};
