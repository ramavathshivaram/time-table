import logger from "#configs/logger.js";

import { Worker } from "bullmq";

import workerEventHandlers from "./workerEventHandlers.js";

import emailWorker from "./email.worker.js";

const workerFactories = [emailWorker];

let workers: Worker[] = [];

const start = async (): Promise<void> => {
  workers = workerFactories.map((createWorker) => {
    const worker = createWorker();

    workerEventHandlers(worker);

    return worker;
  });

  logger.info("All workers started");
};

const close = async (): Promise<void> => {
  logger.info("Closing workers...");

  await Promise.all(workers.map((worker) => worker.close()));

  logger.info("All workers closed");
};

export const worker = {
  start,
  close,
};
