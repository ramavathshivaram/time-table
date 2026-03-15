import { nodeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { tool } from "langchain";
import { z } from "zod";
import { generateNodeId } from "../../libs/workflow.lib.js";

import {
  addNodeEmit,
  removeNodeEmit,
  updateNodeEmit,
  addNodesEmit,
} from "#services/socket-service/workflow/emitters/node.emit.js";

const addNodeTool = tool(
  async ({ workflowId, node }) => {
    try {
      console.log("add node tool called", workflowId, node);

      const newNode = {
        ...node,
        id: generateNodeId(),
      };

      // Save node
      await nodeController.addNodeGRPC(workflowId, newNode);

      // Emit realtime update
      addNodeEmit(workflowId, newNode);

      return {
        success: true,
        action: "node_added",
        node: newNode,
      };
    } catch (error) {
      console.error("add node tool error:", error);

      return {
        success: false,
        action: "node_add_failed",
        error: error.message,
      };
    }
  },
  {
    name: "add_node",
    description: "Add a node to the workflow graph",
    schema: z.object({
      workflowId: z
        .string()
        .describe(
          "Unique identifier of the workflow where the node will be added",
        ),

      node: z
        .object({
          type: z
            .enum(["section", "year", "branch", "college"])
            .describe(
              "Type of node representing hierarchy levels in the timetable system",
            ),

          data: z.object({
            label: z
              .string()
              .describe("Display name of the node shown in the workflow graph"),
          }),

          position: z.object({
            x: z
              .number()
              .describe("Horizontal position of the node in the canvas"),

            y: z
              .number()
              .describe("Vertical position of the node in the canvas"),
          }),
        })
        .describe("Node object containing type, data, and position"),
    }),
  },
);

const addNodesTool = tool(
  async ({ workflowId, nodes }) => {
    try {
      console.log("add nodes tool called", workflowId, nodes);

      const newNodes = nodes.map((node) => ({
        ...node,
        id: generateNodeId(),
      }));

      await nodeController.addNodesGRPC(workflowId, newNodes);

      addNodesEmit(workflowId, newNodes);

      return {
        success: true,
        action: "nodes_added",
        count: newNodes.length,
        nodes: newNodes,
      };
    } catch (error) {
      console.error("add nodes tool error:", error);

      return {
        success: false,
        action: "nodes_add_failed",
        error: error.message,
      };
    }
  },
  {
    name: "add_nodes",
    description: "Add multiple nodes to the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe(
          "Unique identifier of the workflow where nodes will be added",
        ),

      nodes: z
        .array(
          z.object({
            type: z
              .enum(["section", "year", "branch", "college"])
              .describe("Type of the node in the workflow hierarchy"),

            data: z.object({
              label: z.string().describe("Display name of the node"),
            }),

            position: z.object({
              x: z
                .number()
                .describe("Horizontal position of the node in the graph"),

              y: z
                .number()
                .describe("Vertical position of the node in the graph"),
            }),
          }),
        )
        .describe("Array of nodes to add to the workflow"),
    }),
  },
);

const removeNodeTool = tool(
  async ({ workflowId, nodeId }) => {
    console.log("remove node tool called", workflowId, nodeId);

    await nodeController.removeNodeGRPC(workflowId, nodeId);

    removeNodeEmit(workflowId, nodeId);

    return {
      success: true,
      action: "node_removed",
      nodeId,
    };
  },
  {
    name: "remove_node",
    description: "Remove a node from the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Unique identifier of the workflow containing the node"),

      nodeId: z
        .string()
        .describe("Unique identifier of the node that should be removed"),
    }),
  },
);

const updateNodeTool = tool(
  async ({ workflowId, nodeId, nodeData }) => {
    console.log("update node tool called", workflowId, nodeId);

    await nodeController.updateNodeGRPC(workflowId, nodeId, nodeData);

    updateNodeEmit(workflowId, nodeId, nodeData);

    return {
      success: true,
      action: "node_updated",
      nodeId,
    };
  },
  {
    name: "update_node",
    description: "Update an existing node in the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Unique identifier of the workflow containing the node"),

      nodeId: z.string().describe("Unique identifier of the node to update"),

      nodeData: z
        .any()
        .describe(
          "Updated node properties such as position, label or metadata",
        ),
    }),
  },
);

const getNodeTool = tool(
  async ({ workflowId, nodeId }) => {
    console.log("get node tool called", workflowId, nodeId);

    const node = await workflowGrpc.getNodeGRPC(workflowId, nodeId);

    return {
      success: true,
      node,
    };
  },
  {
    name: "get_node",
    description: "Retrieve a specific node from the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Unique identifier of the workflow containing the node"),

      nodeId: z.string().describe("Unique identifier of the node to retrieve"),
    }),
  },
);

const getNodesTool = tool(
  async ({ workflowId }) => {
    console.log("get nodes tool called", workflowId);

    const nodes = await workflowGrpc.getNodesGRPC(workflowId);

    return {
      success: true,
      nodes,
    };
  },
  {
    name: "get_all_nodes",
    description: "Retrieve a all nodes from the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Unique identifier of the workflow containing the node"),
    }),
  },
);

export default [
  addNodeTool,
  addNodesTool,
  removeNodeTool,
  updateNodeTool,
  getNodeTool,
  getNodesTool,
];
