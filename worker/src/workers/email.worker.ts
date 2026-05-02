import { Worker, Job } from "bullmq";
import redis from "#configs/redis.js";
import logger from "#configs/logger.js";
import sendEmail from "#services/send-email.js";
import { queueConst } from "#utils/const.js";

interface EmailJobData {
  email: string;
  subject: string;
  html: string;
}

const emailJob = async (job: Job<EmailJobData>) => {
  const { email, subject, html } = job.data;

  try {
    const messageId = await sendEmail(email, subject, html);

    logger.info("✅ Email sent", {
      email,
      jobId: job.id,
      messageId,
    });

    return messageId;
  } catch (error) {
    logger.error("❌ Email failed", {
      email,
      jobId: job.id,
      attemptsMade: job.attemptsMade,
      error,
    });

    throw error;
  }
};

const createEmailWorker = () =>
  new Worker<EmailJobData>(queueConst.SEND_EMAIL, emailJob, {
    connection: redis,
    concurrency: 1,
  });

export default createEmailWorker;
