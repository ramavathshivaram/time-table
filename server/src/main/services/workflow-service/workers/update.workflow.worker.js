import { queueConst } from "../lib/const.js";
import { Worker } from "bullmq";
import redis from "../../../shared/configs/redis.js";

import workflowRepository from "../repositorys/workflow.repository.js";

const updateWorkflowJob = async (job) => {
  const { workflowId, data } = job.data;

  await workflowRepository.updateWorkflowById(workflowId, data);
};

const updateWorkflowWorker = () =>
  new Worker(queueConst.UPDATE_WORKFLOW, updateWorkflowJob, {
    connection: redis,
    deleteOnComplete: {
      count: 1000,
    },
  });

export default updateWorkflowWorker;
