import { Queue } from "bullmq";
import redis from "../../../shared/configs/redis.js";

import { queueConst } from "../lib/const.js";

export const sendOtpEmailQueue = new Queue(queueConst.SEND_OTP_EMAIL, {
  connection: redis,
});
