import { queueConst } from "../lib/const.js";
import { Worker } from "bullmq";

import redis from "#shared/configs/redis.js";

import sendEmail from "#shared/configs/sendEmail.js";

const emailJob = async (job) => {
  const { email, subject, html } = job.data;

  await sendEmail(email, subject, html);
};

const worker = () =>
  new Worker(queueConst.SEND_EMAIL, emailJob, {
    connection: redis,
  });

export default worker;
