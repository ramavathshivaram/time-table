import asyncHandler from "express-async-handler";
import workflowService from "./workflow.service.js";
import type { Request, Response } from "express";

const createWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const workflowId = await workflowService.createWorkflow(userId);

  return res.status(201).json({
    success: true,
    data: {
      workflowId,
    },
  });
});

const getWorkflowById = asyncHandler(async (req: Request, res: Response) => {
  const workflowId = req.params.workflowId;
  const workflow = await workflowService.getWorkflowById(workflowId);

  return res.status(200).json({
    success: true,
    data: workflow,
  });
});

const getAllUserWorkflows = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    const page = Number(req.query.pageParam) || 0;
    const limit = Number(req.query.limit) || 10;
    const query = String(req.query.query) || "";

    const workflows = await workflowService.getAllUserWorkflows(
      userId,
      page,
      limit,
      query,
    );

    return res.status(200).json({
      success: true,
      data: workflows,
      pageParam: page + 1,
    });
  },
);

const getRecentWorkflows = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const workflows = await workflowService.getRecentWorkflows(userId);
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
