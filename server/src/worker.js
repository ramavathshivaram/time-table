import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import connectDB from "./shared/configs/mongoDB.js";

import authWorkerFactories from "./services/auth-service/workers/index.js";
import workflowWorkerFactories from "./services/workflow-service/workers/index.js";
import redis from "#configs/redis.js";

const workerFactories = [...authWorkerFactories, ...workflowWorkerFactories];

let workers = [];

const workerEventHandlers = (worker) => {
  const name = worker.name;

  worker.on("ready", () => {
    console.log(`✅ Worker ready: ${name}`);
  });

  worker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed in ${name}`);
  });

  worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} failed in ${name}:`, err?.message);
  });

  worker.on("error", (err) => {
    console.error(`🚨 Worker error in ${name}:`, err);
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

    console.log("🚀 All workers started");
  } catch (error) {
    console.error("Worker startup failed:", error);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  console.log("Shutting down workers...");

  try {
    for (const worker of workers) {
      await worker.close();
    }

    await redis.disconnect();
    await mongoose.disconnect();

    console.log("All workers shut down cleanly.");
    process.exit(0);
  } catch (error) {
    console.error("Shutdown error:", error);
    process.exit(1);
  }
};

startWorkers();

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
