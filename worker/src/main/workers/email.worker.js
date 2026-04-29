import { Queue, Worker } from "bullmq";
import redis from "#configs/redis.js";
import logger from "#configs/logger.js";
import sendEmail from "#services/send-email.js";
import { queueConst } from "#utils/const.js";

export const emailQueue = new Queue(queueConst.SEND_EMAIL, {
  connection: redis,
});

const emailJob = async (job) => {
  try {
    const { email, subject, html } = job.data;

    await sendEmail(email, subject, html);

    logger.info(`✅ Email sent to ${email}`);
  } catch (err) {
    logger.error("❌ Email failed:", err);
    throw err;
  }
};

const worker = () =>
  new Worker(queueConst.SEND_EMAIL, emailJob, {
    connection: redis,
  });

export default worker;
