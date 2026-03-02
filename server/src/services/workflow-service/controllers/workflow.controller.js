import asyncHandler from "express-async-handler";
import workflowRepository from "../repositorys/workflow.repository.js";
import { updateWorkflowQueue } from "../queues/update.workflow.queue.js";

const createWorkflow = asyncHandler(async (req, res) => {
  const createdWorkflow = await workflowRepository.createWorkflow({
    title: `Workflow ${Date.now().toFixed(5)}`,
    userId: req.userId,
  });

  return res.status(201).json({
    success: true,
    data: {
      id: createdWorkflow._id,
    },
  });
});

const getWorkflowById = asyncHandler(async (req, res) => {
  const workflowId = req.params.workflowId;
  const workflow = await workflowRepository.getWorkflowById(workflowId);
  return res.status(200).json({
    success: true,
    data: workflow,
  });
});

const getAllUserWorkflows = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const workflows =
    await workflowRepository.getAllUserWorkflowsByUserId(userId);
  return res.status(200).json({
    success: true,
    data: workflows,
  });
});

const updateWorkflow = asyncHandler(async (req, res) => {
  const workflowId = req.params.workflowId;

  await updateWorkflowQueue.add("updateWorkflow", {
    workflowId,
    data: req.body,
  });

  return res.status(200).json({
    success: true,
  });
});

export default {
  getAllUserWorkflows,
  createWorkflow,
  getWorkflowById,
  updateWorkflow,
};
