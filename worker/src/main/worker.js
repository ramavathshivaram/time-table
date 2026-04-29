import logger from "#configs/logger.js";
import redis, { checkRedis, disconnectRedis } from "#configs/redis.js";

import emailWorker from "#workers/email.worker.js";

const workerFactories = [emailWorker];

let workers = [];

const workerEventHandlers = (worker) => {
  const name = worker.name;

  worker.on("ready", () => {
    logger.info(`✅ Worker ready: ${name}`);
  });

  worker.on("completed", (job) => {
    logger.info(`✅ Job ${job.id} completed in ${name}`);
  });

  worker.on("failed", (job, err) => {
    logger.error(`❌ Job ${job?.id} failed in ${name}:`, err?.message);
  });

  worker.on("error", (err) => {
    logger.error(`🚨 Worker error in ${name}:`, err);
  });
};

const startWorkers = async () => {
  try {
    await checkRedis();

    workers = workerFactories.map((createWorker) => {
      const worker = createWorker();
      workerEventHandlers(worker);
      return worker;
    });

    logger.info("🚀 All workers started");
  } catch (error) {
    logger.error("Worker startup failed:", error);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  logger.info("Shutting down workers...");

  try {
    for (const worker of workers) {
      await worker.close();
    }

    await disconnectRedis();

    logger.info("All workers shut down cleanly.");
    process.exit(0);
  } catch (error) {
    logger.error("Shutdown error:", error);
    process.exit(1);
  }
};

startWorkers();

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
