import redis from "#configs/redis.js";
import { Queue } from "bullmq";
import { queueConst } from "../lib/const.js";

export const sendRegisterEmailQueue = new Queue(
  queueConst.SEND_REGISTER_EMAIL,
  {
    connection: redis,
  },
);
