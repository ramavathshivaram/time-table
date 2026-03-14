import { Queue } from "bullmq";
import redis from "#shared/configs/redis.js";

import { queueConst } from "../lib/const.js";

export const emailQueue = new Queue(queueConst.SEND_EMAIL, {
  connection: redis,
});
