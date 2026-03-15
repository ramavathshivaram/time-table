import { subjectController } from "#services/workflow-service/routes/workflow.grpc.js";
import { tool } from "langchain";
import { z } from "zod";
import { generateSubjectId } from "../../libs/workflow.lib.js";

const addSubjectTool = tool(
  async ({ workflowId, subject }) => {
    try {
      const newSubject = {
        ...subject,
        id: generateSubjectId(),
      };

      await subjectController.addSubjectGRPC(workflowId, newSubject);

      return {
        success: true,
        action: "subject_added",
        subject: newSubject,
      };
    } catch (error) {
      console.error("add subject tool error:", error);

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

      return {
        success: true,
        action: "subject_removed",
        subjectId,
      };
    } catch (error) {
      console.error("remove subject tool error:", error);

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

      return {
        success: true,
        action: "subject_updated",
        subjectId,
        updates: subjectData,
      };
    } catch (error) {
      console.error("update subject tool error:", error);

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

export default [addSubjectTool, removeSubjectTool, updateSubjectTool];
