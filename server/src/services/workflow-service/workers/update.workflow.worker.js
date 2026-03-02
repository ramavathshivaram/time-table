import { queueConst } from "../lib/const.js";
import { Worker } from "bullmq";
import redis from "../../../shared/configs/redis.js";

import workflowRepository from "../repositorys/workflow.repository.js";

const updateWorkflowJob = async (job) => {
  console.log("Processing:", job.data);

  const { workflowId, data } = job.data;

  await workflowRepository.updateWorkflowById(workflowId, data);
};

const worker = new Worker(queueConst.UPDATE_WORKFLOW, updateWorkflowJob, {
  connection: redis,
});

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job failed`, err);
});

worker.on("error", (err) => {
  console.log(`Worker error`, err);
});

worker.on("ready", () => {
  console.log("update workflow worker is ready");
});

export default worker;
