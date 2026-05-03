import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import nodeService from "./node.service.js";
import ApiError from "#utils/ApiError.js";

const getNode = asyncHandler(async (req: Request, res: Response) => {
  const { nodeId } = req.params;

  if (!nodeId) {
    throw new ApiError(400, "nodeId is required");
  }

  const node = await nodeService.getNode(nodeId);

  if (!node) {
    throw new ApiError(404, "Node not found");
  }

  res.status(200).json({
    success: true,
    data: node,
  });
});

const getNodes = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.query;

  if (!workflowId) {
    throw new ApiError(404, "Nodes not found");
  }

  const nodes = await nodeService.getNodes(workflowId);

  res.status(200).json({
    success: true,
    data: nodes,
  });
});

const addNode = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.query;
  const node = req.body;

  if (!workflowId) {
    throw new ApiError(400, "workflowId is required");
  }

  const created = await nodeService.addNode(workflowId, node);

  res.status(201).json({
    success: true,
    data: created,
  });
});

const addNodes = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.params;
  const nodes = req.body;

  if (!workflowId) {
    throw new ApiError(400, "workflowId is required");
  }

  if (!Array.isArray(nodes)) {
    throw new ApiError(400, "workflowId is required");
  }

  const created = await nodeService.addNodes(workflowId, nodes);

  res.status(201).json({
    success: true,
    data: created,
  });
});

const updateNode = asyncHandler(async (req: Request, res: Response) => {
  const { nodeId } = req.query;
  const updateFields = req.body;

  if (!nodeId) {
    throw new ApiError(400, "workflowId is required");
  }

  const updated = await nodeService.updateNode(nodeId, updateFields);

  res.status(200).json({
    success: true,
    data: updated,
  });
});

const removeNode = asyncHandler(async (req: Request, res: Response) => {
  const { nodeId } = req.query;

  if (!nodeId) {
    throw new ApiError(400, "workflowId is required");
  }

  await nodeService.removeNode( nodeId);

  res.status(200).json({
    success: true,
    message: "Node deleted successfully",
  });
});

const nodeController = {
  getNode,
  getNodes,
  addNode,
  addNodes,
  updateNode,
  removeNode,
};

export default nodeController;
