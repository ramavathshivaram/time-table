import asyncHandler from "express-async-handler";
import workflowRepository from "../repositorys/workflow.repository.js";

const createWorkflow = asyncHandler(async (req, res) => {
  const createdWorkflow = await workflowRepository.createWorkflow({
    title: `Workflow ${Date.now().toString().substring(0, 5)}`,
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

  const page = Number(req.query.pageParam) || 0;
  const limit = Number(req.query.limit) || 10;

  const skip = page * limit;

  const workflows = await workflowRepository.getAllUserWorkflowsByUserId(
    userId,
    { skip, limit },
  );

  return res.status(200).json({
    success: true,
    data: workflows,
    pageParam: page + 1,
  });
});

const getRecentWorkflows = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const workflows = await workflowRepository.getRecentWorkflowsByUserId(userId);
  return res.status(200).json({
    success: true,
    data: workflows,
  });
});

export default {
  getAllUserWorkflows,
  createWorkflow,
  getWorkflowById,
  getRecentWorkflows,
};
