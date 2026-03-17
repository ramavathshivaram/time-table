import { facultyController } from "#services/workflow-service/routes/workflow.grpc.js";
import { tool } from "langchain";
import { z } from "zod";
import { generateFacultyId } from "../../libs/workflow.lib.js";
import logger from "#configs/logger.js";

import {
  addFacultyEmit,
  removeFacultyEmit,
  updateFacultyEmit,
} from "#services/socket-service/workflow/emitters/faculty.emit.js";

const getFacultyTool = tool(
  async ({ workflowId, facultyId }) => {
    try {
      logger.info("get faculties tool called", workflowId);

      const faculties = await facultyController.getFacultyGRPC(
        workflowId,
        facultyId,
      );

      return {
        success: true,
        faculties,
      };
    } catch (error) {
      logger.error("get faculties tool error:", error);

      return {
        success: false,
        error: error.message,
      };
    }
  },
  {
    name: "get_faculties",
    description: "Get all faculties from the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the faculties"),

      facultyId: z.string().describe("Unique identifier of the faculty to get"),
    }),
  },
);

const getFacultiesTool = tool(
  async ({ workflowId }) => {
    try {
      logger.info("get faculties tool called", workflowId);

      const faculties = await facultyController.getFacultiesGRPC(workflowId);

      return {
        success: true,
        faculties,
      };
    } catch (error) {
      logger.error("get faculties tool error:", error);

      return {
        success: false,
        error: error.message,
      };
    }
  },
  {
    name: "get_faculties",
    description: "Get all faculties from the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the faculties"),
    }),
  },
);

const addFacultyTool = tool(
  async ({ workflowId, faculty }) => {
    try {
      const newFaculty = {
        ...faculty,
        id: generateFacultyId(),
      };

      await facultyController.addFacultyGRPC(workflowId, newFaculty);

      addFacultyEmit(workflowId, newFaculty);

      return {
        success: true,
        action: "faculty_added",
        faculty: newFaculty,
      };
    } catch (error) {
      logger.error("add faculty tool error:", error);

      return {
        success: false,
        action: "faculty_add_failed",
        error: error.message,
      };
    }
  },
  {
    name: "add_faculty",
    description: "Add a faculty member to the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier where the faculty will be added"),

      faculty: z.object({
        name: z.string().describe("Full name of the faculty member"),

        subjects: z
          .array(z.string())
          .describe("Array of subject IDs that the faculty can teach"),
      }),
    }),
  },
);

const removeFacultyTool = tool(
  async ({ workflowId, facultyId }) => {
    try {
      await facultyController.removeFacultyGRPC(workflowId, facultyId);

      removeFacultyEmit(workflowId, facultyId);

      return {
        success: true,
        action: "faculty_removed",
        facultyId,
      };
    } catch (error) {
      logger.error("remove faculty tool error:", error);

      return {
        success: false,
        action: "faculty_remove_failed",
        error: error.message,
      };
    }
  },
  {
    name: "remove_faculty",
    description: "Remove a faculty member from the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the faculty"),

      facultyId: z
        .string()
        .describe("Unique identifier of the faculty to remove"),
    }),
  },
);

const updateFacultyTool = tool(
  async ({ workflowId, facultyId, facultyData }) => {
    try {
      await facultyController.updateFacultyGRPC(
        workflowId,
        facultyId,
        facultyData,
      );

      updateFacultyEmit(workflowId, facultyId, facultyData);

      return {
        success: true,
        action: "faculty_updated",
        facultyId,
        updates: facultyData,
      };
    } catch (error) {
      logger.error("update faculty tool error:", error);

      return {
        success: false,
        action: "faculty_update_failed",
        error: error.message,
      };
    }
  },
  {
    name: "update_faculty",
    description: "Update faculty details in the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the faculty"),

      facultyId: z.string().describe("Unique identifier of the faculty"),

      facultyData: z.object({
        name: z.string().optional().describe("Updated faculty name"),

        subjects: z
          .array(z.string())
          .optional()
          .describe("Updated list of subject IDs taught by the faculty"),
      }),
    }),
  },
);

export default [
  getFacultiesTool,
  getFacultyTool,
  addFacultyTool,
  removeFacultyTool,
  updateFacultyTool,
];
