import { Queue } from "bullmq";
import redis from "#/shared/configs/redis.js";

import { queueConst } from "../lib/const.js";

export const updateWorkflowQueue = new Queue(queueConst.UPDATE_WORKFLOW, {
  connection: redis,
});
