import { edgeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { tool } from "langchain";
import { z } from "zod";
import { generateEdgeId } from "../../libs/workflow.lib.js";

const addEdgeTool = tool(
  async ({ workflowId, edge }) => {
    try {
      console.log("add edge tool called", workflowId, edge);

      const newEdge = {
        ...edge,
        id: generateEdgeId(),
      };

      await edgeController.addEdgeGRPC(workflowId, newEdge);

      return {
        success: true,
        action: "edge_added",
        edge: newEdge,
      };
    } catch (error) {
      console.error("add edge tool error:", error);

      return {
        success: false,
        action: "edge_add_failed",
        error: error.message,
      };
    }
  },
  {
    name: "add_edge",
    description: "Add an edge between two nodes in the workflow graph",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier where the edge will be added"),

      edge: z.object({
        source: z.string().describe("ID of the source node"),

        target: z.string().describe("ID of the target node"),

        type: z
          .string()
          .optional()
          .describe("Edge type in the graph (default, smoothstep, etc)"),
      }),
    }),
  },
);

const removeEdgeTool = tool(
  async ({ workflowId, edgeId }) => {
    try {
      console.log("remove edge tool called", workflowId, edgeId);

      await edgeController.removeEdgeGRPC(workflowId, edgeId);

      return {
        success: true,
        action: "edge_removed",
        edgeId,
      };
    } catch (error) {
      console.error("remove edge tool error:", error);

      return {
        success: false,
        action: "edge_remove_failed",
        error: error.message,
      };
    }
  },
  {
    name: "remove_edge",
    description: "Remove an edge from the workflow graph",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the edge"),

      edgeId: z.string().describe("Unique identifier of the edge to remove"),
    }),
  },
);

export default [addEdgeTool, removeEdgeTool];
