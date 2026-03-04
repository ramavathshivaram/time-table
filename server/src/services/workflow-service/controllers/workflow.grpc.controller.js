import workflowRepository from "../repositorys/workflow.repository.js";
import { updateWorkflowQueue } from "../queues/update.workflow.queue.js";
import { queueConst } from "../lib/const.js";

export const updateWorkflow = async (call, callback) => {
  const { workflowId, data } = call;
  await updateWorkflowQueue.add(queueConst.UPDATE_WORKFLOW, {
    workflowId,
    data,
  });
  callback(null, { success: true });
};
