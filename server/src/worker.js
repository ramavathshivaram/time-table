import "dotenv/config";
import logger from "#configs/logger.js";
import redis from "#configs/redis.js";

import mongoose from "mongoose";
import connectDB from "#shared/configs/mongoDB.js";

import sharedWorkerFactories from "./shared/workers/index.js";
import authWorkerFactories from "./services/auth-service/workers/index.js";
import workflowWorkerFactories from "./services/workflow-service/workers/index.js";
import userWorkerFactories from "./services/user-service/workers/index.js";

const workerFactories = [
  ...sharedWorkerFactories,
  ...authWorkerFactories,
  ...workflowWorkerFactories,
  ...userWorkerFactories,
];

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
    await connectDB();

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

    await redis.disconnect();
    await mongoose.disconnect();

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
