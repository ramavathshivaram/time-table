import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import facultyService from "./faculty.service.js";
import ApiError from "#utils/ApiError.js";

const getFaculties = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.query as { workflowId?: string };

  if (!workflowId) {
    throw new ApiError(400, "workflowId is required");
  }

  const faculties = await facultyService.getFaculties(workflowId);

  res.status(200).json({
    success: true,
    data: faculties,
  });
});

const getFaculty = asyncHandler(async (req: Request, res: Response) => {
  const { facultyId } = req.params;

  if (!facultyId) {
    throw new ApiError(400, "workflowId and facultyId are required");
  }

  const faculty = await facultyService.getFaculty(facultyId);

  res.status(200).json({
    success: true,
    data: faculty,
  });
});

const addFaculty = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.query as { workflowId?: string };
  const faculty = req.body;

  if (!workflowId) {
    throw new ApiError(400, "workflowId is required");
  }

  const created = await facultyService.addFaculty(workflowId, faculty);

  res.status(201).json({
    success: true,
    data: created,
  });
});

const updateFaculty = asyncHandler(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  const updateFields = req.body;

  if (!facultyId) {
    throw new ApiError(400, "workflowId and facultyId are required");
  }

  const updated = await facultyService.updateFaculty(facultyId, updateFields);

  res.status(200).json({
    success: true,
    data: updated,
  });
});

const removeFaculty = asyncHandler(async (req: Request, res: Response) => {
  const { facultyId } = req.params;

  if (!facultyId) {
    throw new ApiError(400, "workflowId and facultyId are required");
  }

  await facultyService.removeFaculty(facultyId);

  res.status(200).json({
    success: true,
    message: "Faculty deleted successfully",
  });
});

const facultyController = {
  getFaculties,
  getFaculty,
  addFaculty,
  updateFaculty,
  removeFaculty,
};

export default facultyController;
