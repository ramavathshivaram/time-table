import { subjectController } from "#services/workflow-service/routes/workflow.grpc.js";
import { tool } from "langchain";
import { z } from "zod";
import { generateSubjectId } from "../../libs/workflow.lib.js";
import logger from "#configs/logger.js";

import {
  addSubjectEmit,
  removeSubjectEmit,
  updateSubjectEmit,
} from "#services/socket-service/workflow/emitters/subject.emit.js";

const getSubjectTool = tool(
  async ({ workflowId, subjectId }) => {
    try {
      logger.info("get subject tool called", workflowId, subjectId);

      const subject = await subjectController.getSubjectGRPC(
        workflowId,
        subjectId,
      );

      return {
        success: true,
        subject,
      };
    } catch (error) {
      logger.error("get subject tool error:", error);

      return {
        success: false,
        error: error.message,
      };
    }
  },
  {
    name: "get_subject",
    description: "Get a subject from the workflow timetable system",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the subject"),

      subjectId: z
        .string()
        .describe("Identifier of the subject to be retrieved"),
    }),
  },
);

const getSubjectsTool = tool(
  async ({ workflowId }) => {
    try {
      logger.info("get subjects tool called", workflowId);

      const subjects = await subjectController.getSubjectsGRPC(workflowId);

      return {
        success: true,
        subjects,
      };
    } catch (error) {
      logger.error("get subjects tool error:", error);

      return {
        success: false,
        error: error.message,
      };
    }
  },
  {
    name: "get_subjects",
    description: "Get all subjects from the workflow timetable system",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the subjects"),
    }),
  },
);

const addSubjectTool = tool(
  async ({ workflowId, subject }) => {
    try {
      const newSubject = {
        ...subject,
        id: generateSubjectId(),
      };

      await subjectController.addSubjectGRPC(workflowId, newSubject);

      addSubjectEmit(workflowId, newSubject);

      return {
        success: true,
        action: "subject_added",
        subject: newSubject,
      };
    } catch (error) {
      logger.error("add subject tool error:", error);

      return {
        success: false,
        action: "subject_add_failed",
        error: error.message,
      };
    }
  },
  {
    name: "add_subject",
    description: "Add a subject to the workflow timetable system",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier where the subject will be added"),

      subject: z.object({
        name: z.string().describe("Name of the subject"),

        duration: z.number().describe("Number of periods required per week"),

        isLab: z.boolean().describe("Whether the subject is a lab or theory"),
      }),
    }),
  },
);

const removeSubjectTool = tool(
  async ({ workflowId, subjectId }) => {
    try {
      await subjectController.removeSubjectGRPC(workflowId, subjectId);

      removeSubjectEmit(workflowId, subjectId);

      return {
        success: true,
        action: "subject_removed",
        subjectId,
      };
    } catch (error) {
      logger.error("remove subject tool error:", error);

      return {
        success: false,
        action: "subject_remove_failed",
        error: error.message,
      };
    }
  },
  {
    name: "remove_subject",
    description: "Remove a subject from the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the subject"),

      subjectId: z.string().describe("Unique identifier of the subject"),
    }),
  },
);

const updateSubjectTool = tool(
  async ({ workflowId, subjectId, subjectData }) => {
    try {
      await subjectController.updateSubjectGRPC(
        workflowId,
        subjectId,
        subjectData,
      );

      updateSubjectEmit(workflowId, subjectId, subjectData);

      return {
        success: true,
        action: "subject_updated",
        subjectId,
        updates: subjectData,
      };
    } catch (error) {
      logger.error("update subject tool error:", error);

      return {
        success: false,
        action: "subject_update_failed",
        error: error.message,
      };
    }
  },
  {
    name: "update_subject",
    description: "Update subject details in the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the subject"),

      subjectId: z.string().describe("Unique identifier of the subject"),

      subjectData: z.object({
        name: z.string().optional().describe("Updated subject name"),

        duration: z
          .number()
          .optional()
          .describe("Updated number of weekly periods"),

        isLab: z.boolean().optional().describe("Updated lab status"),
      }),
    }),
  },
);

export default [
  getSubjectTool,
  getSubjectsTool,
  addSubjectTool,
  removeSubjectTool,
  updateSubjectTool,
];
