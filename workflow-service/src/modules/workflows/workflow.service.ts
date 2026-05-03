import type { IWorkflow } from "./workflow.model.js";
import workflowRepository from "./workflow.repository.js";

const generateWorkflowTitle = (): string =>
  `Workflow ${Date.now().toString().substring(0, 5)}`;

const createWorkflow = async (
  userId: IWorkflow["userId"] | undefined,
): Promise<IWorkflow["_id"]> => {
  if (!userId) throw new Error("User id not found");

  const createdWorkflow = await workflowRepository.createWorkflow({
    title: generateWorkflowTitle(),
    userId,
  });

  return createdWorkflow._id;
};

const getWorkflowById = async (workflowId: IWorkflow["_id"]) => {
  const workflow = await workflowRepository.getWorkflowById(workflowId);
  return workflow;
};

const getAllUserWorkflows = async (
  userId: IWorkflow["userId"] | undefined,
  page: number = 0,
  limit: number = 10,
  query: string = "",
) => {
  if (!userId) throw new Error("User id not found");
  const skip = page * limit;

  const workflows = await workflowRepository.getAllUserWorkflowsByUserId(
    userId,
    { skip, limit, query },
  );

  return workflows;
};

const getRecentWorkflows = async (userId: IWorkflow["userId"] | undefined) => {
  if (!userId) throw new Error("User id not found");
  const workflows = await workflowRepository.getRecentWorkflowsByUserId(userId);
  return workflows;
};

export default {
  getAllUserWorkflows,
  createWorkflow,
  getWorkflowById,
  getRecentWorkflows,
};
