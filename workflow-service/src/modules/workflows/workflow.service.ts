import type { Types } from "mongoose";
import workflowRepository from "./workflow.repository.js";

const generateWorkflowTitle = (): string =>
  `Workflow ${Date.now().toString().substring(0, 5)}`;

const createWorkflow = async (
  userId: Types.ObjectId | undefined,
): Promise<Types.ObjectId> => {

  if (!userId) throw new Error("User id not found");

  const createdWorkflow = await workflowRepository.createWorkflow({
    title: generateWorkflowTitle(),
    userId,
  });

  return createdWorkflow._id;
};

const getWorkflowById = async (workflowId: Types.ObjectId) => {
  const workflow = await workflowRepository.getWorkflowById(workflowId);
  return workflow;
};

const getAllUserWorkflows = async (
  userId: Types.ObjectId|undefined,
  page: number = 0,
  limit: number = 10,
  query: string = "",
) => {
  if(!userId) throw new Error("User id not found");
  const skip = page * limit;

  console.log(userId)

  const workflows = await workflowRepository.getAllUserWorkflowsByUserId(
    userId,
    { skip, limit, query },
  );

  console.log(workflows)

  return workflows;
};

const getRecentWorkflows = async (userId: Types.ObjectId|undefined) => {
   if(!userId) throw new Error("User id not found");
  const workflows = await workflowRepository.getRecentWorkflowsByUserId(userId);
  return workflows;
};

export default {
  getAllUserWorkflows,
  createWorkflow,
  getWorkflowById,
  getRecentWorkflows,
};
