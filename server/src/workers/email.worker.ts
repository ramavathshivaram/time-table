import { Worker, Job, UnrecoverableError } from "bullmq";

import redis from "#configs/redis.js";
import logger from "#configs/logger.js";

import { emailService } from "./email.service.js";

const emailJob = async (job: Job) => {
  const { email } = job.data;

  try {
    switch (job.name) {
      case "forgot-password":
        emailService.forgotPassword(email, job.data);
      case "register-greeting":
        emailService.registerGreeting(email, job.data);

      default:
        throw new UnrecoverableError(`Unknown email job type: ${job.name}`);
    }
  } catch (error: any) {
    const status = error?.response?.status;

    logger.error("Email job failed", {
      jobId: job.id,
      jobName: job.name,
      email,
      status,
      attemptsMade: job.attemptsMade,
      message: error?.message,
      stack: error?.stack,
    });

    if ([400, 401, 403, 404].includes(status)) {
      throw new UnrecoverableError(`Permanent email failure (${status})`);
    }

    throw error;
  }
};

const createEmailWorker = () =>
  new Worker("email", emailJob, {
    connection: redis,
    concurrency: 10,
    removeOnComplete: {
      age: 0,
    },
    removeOnFail: {
      count: 100,
    },
  });

export default createEmailWorker;
