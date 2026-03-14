import { create } from "zustand";

import {
  addNodeEmit,
  removeNodeEmit,
  addEdgeEmit,
  removeEdgeEmit,
} from "@/hooks/socket/workflow.socket/useGraphEmitter.js";

const useWorkflowStore = create((set, get) => ({
  workflowId: null,

  nodes: [],
  edges: [],

  init: (workflowId, nodes, edges) => set({ workflowId, nodes, edges }),

  setNodes: (nodes) =>
    set((state) => ({
      nodes: typeof nodes === "function" ? nodes(state.nodes) : nodes,
    })),

  setEdges: (edges) =>
    set((state) => ({
      edges: typeof edges === "function" ? edges(state.edges) : edges,
    })),

  addNode: (node) => {
    const { workflowId, nodes } = get();

    addNodeEmit(workflowId, node);

    set({
      nodes: [...nodes, node],
    });
  },

  removeNode: (nodeId) => {
    removeNodeEmit(get().workflowId, nodeId);

    set((state) => ({ nodes: state.nodes.filter((n) => n.id !== nodeId) }));
  },

  addEdge: (edge) => {
    addEdgeEmit(get().workflowId, edge);

    set((state) => ({
      edges: [...state.edges, edge],
    }));
  },

  removeEdge: (edgeId) => {
    removeEdgeEmit(get().workflowId, edgeId);
    set((state) => ({ edges: state.edges.filter((e) => e.id !== edgeId) }));
  },
}));

export default useWorkflowStore;
