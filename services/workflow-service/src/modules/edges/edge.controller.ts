import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import ApiError from "#utils/ApiError.js";
import edgeService from "./edge.service.js";

const getEdge = asyncHandler(async (req: Request, res: Response) => {
  const { edgeId } = req.params;

  if (!edgeId) {
    throw new ApiError(400,"edgeId is required");
  }

  const edge = await edgeService.getEdge(edgeId);

  res.status(200).json({
    success: true,
    data: edge,
  });
});

const getEdges = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.query as { workflowId?: string };

  if (!workflowId) {
    throw new ApiError(400,"workflowId is required");
  }

  const edges = await edgeService.getEdges(workflowId);

  res.status(200).json({
    success: true,
    data: edges,
  });
});

const addEdge = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.query as { workflowId?: string };
  const edge = req.body;

  if (!workflowId) {
    throw new ApiError(400,"workflowId is required");
  }

  const created = await edgeService.addEdge(workflowId, edge);

  res.status(201).json({
    success: true,
    data: created,
  });
});

const addEdges = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.params;
  const edges = req.body;

  if (!workflowId) {
    throw new ApiError(400,"workflowId is required");
  }

  if (!Array.isArray(edges)) {
    throw new ApiError(400,"Edges must be an array");
  }

  const created = await edgeService.addEdges(workflowId, edges);

  res.status(201).json({
    success: true,
    data: created,
  });
});

const updateEdge = asyncHandler(async (req: Request, res: Response) => {
  const { edgeId } = req.query;
  const updateFields = req.body;

  if (!edgeId) {
    throw new ApiError(400,"edgeId is required");
  }

  const updated = await edgeService.updateEdge(edgeId, updateFields);

  res.status(200).json({
    success: true,
    data: updated,
  });
});

const removeEdge = asyncHandler(async (req: Request, res: Response) => {
  const { edgeId } = req.query;

  if (!edgeId) {
    throw new ApiError(400,"edgeId is required");
  }

  await edgeService.removeEdge(edgeId);

  res.status(200).json({
    success: true,
    message: "Edge deleted successfully",
  });
});

const edgeController = {
  getEdge,
  getEdges,
  addEdge,
  addEdges,
  updateEdge,
  removeEdge,
};

export default edgeController;
