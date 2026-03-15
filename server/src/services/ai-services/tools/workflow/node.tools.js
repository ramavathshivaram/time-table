import workflowGrpc from "../../../workflow-service/routes/workflow.grpc.js";
import { tool } from "langchain";
import { z } from "zod";

import { addNodeEmit } from "#services/socket-service/workflow/emitters/node.emit.js";

const addNodeTool = tool(
  async ({ workflowId, node }) => {
    console.log("add node tool called", workflowId, node);

    await workflowGrpc.addNodeGRPC(workflowId, node);

    addNodeEmit(workflowId, node);

    return {
      success: true,
      action: "node_added",
      nodeId: node.id,
    };
  },
  {
    name: "add_node",
    description: "Add a node to the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe(
          "Unique identifier of the workflow where the node will be added",
        ),

      node: z
        .object({
          id: z
            .string()
            .describe("Unique identifier of the node inside the workflow"),

          type: z
            .enum(["section", "year", "branch", "college"])
            .describe(
              "Type of node representing hierarchy levels in the timetable system",
            ),

          data: z
            .object({
              label: z
                .string()
                .describe(
                  "Display name of the node shown in the workflow graph",
                ),
            })
            .describe("Metadata associated with the node"),

          position: z
            .object({
              x: z
                .number()
                .describe(
                  "Horizontal position of the node in the workflow canvas",
                ),

              y: z
                .number()
                .describe(
                  "Vertical position of the node in the workflow canvas",
                ),
            })
            .describe("Position coordinates of the node in the graph layout"),
        })
        .describe("Node object containing id, type, data and position"),
    }),
  },
);

const addNodesTool = tool(
  async ({ workflowId, nodes }) => {
    console.log("add nodes tool called", workflowId, nodes);

    await workflowGrpc.addNodesGRPC(workflowId, nodes);

    return {
      success: true,
      action: "nodes_added",
      count: nodes.length,
    };
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
            id: z.string().describe("Unique identifier of the node"),

            type: z
              .enum(["section", "year", "branch", "college"])
              .describe("Type of the node in the workflow hierarchy"),

            data: z
              .object({
                label: z.string().describe("Display name of the node"),
              })
              .describe("Node metadata"),

            position: z
              .object({
                x: z
                  .number()
                  .describe("Horizontal position of the node in the graph"),

                y: z
                  .number()
                  .describe("Vertical position of the node in the graph"),
              })
              .describe("Node position coordinates in the workflow canvas"),
          }),
        )
        .describe("Array of nodes to add to the workflow"),
    }),
  },
);

const removeNodeTool = tool(
  async ({ workflowId, nodeId }) => {
    console.log("remove node tool called", workflowId, nodeId);

    await workflowGrpc.removeNodeGRPC(workflowId, nodeId);

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

    await workflowGrpc.updateNodeGRPC(workflowId, nodeId, nodeData);

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
