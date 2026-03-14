import { create } from "zustand";

import {
  addNodeEmit,
  removeNodeEmit,
  addEdgeEmit,
  removeEdgeEmit,
  addNodesEmit,
  addEdgesEmit,
  updateNodeEmit,
  addFacultyEmit,
  removeFacultyEmit,
  updateFacultyEmit,
} from "@/hooks/socket/workflow.socket/useGraphEmitter.js";

const useWorkflowStore = create((set, get) => ({
  workflowId: null,
  nodes: [],
  edges: [],
  faculties: [],

  init: (initialWorkflowData) =>
    set({
      workflowId: initialWorkflowData._id,
      nodes: initialWorkflowData.nodes,
      edges: initialWorkflowData.edges,
      faculties: initialWorkflowData.faculties,
    }),

  //! NODES METHODS
  setNodes: (nodes) =>
    set((state) => ({
      nodes: typeof nodes === "function" ? nodes(state.nodes) : nodes,
    })),

  addNode: (node) => {
    const { workflowId, nodes } = get();

    addNodeEmit(workflowId, node);

    set({
      nodes: [...nodes, node],
    });
  },

  addNodes: (nodes) => {
    const { workflowId } = get();

    addNodesEmit(workflowId, nodes);

    set({
      nodes: [...get().nodes, ...nodes],
    });
  },

  removeNode: (nodeId) => {
    removeNodeEmit(get().workflowId, nodeId);

    set((state) => ({ nodes: state.nodes.filter((n) => n.id !== nodeId) }));
  },

  updateNode: (nodeId, nodeData) => {
    updateNodeEmit(get().workflowId, nodeId, nodeData);
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId ? { ...n, data: nodeData } : n,
      ),
    }));
  },

  //! EDGES METHODS
  setEdges: (edges) =>
    set((state) => ({
      edges: typeof edges === "function" ? edges(state.edges) : edges,
    })),

  addEdge: (edge) => {
    addEdgeEmit(get().workflowId, edge);

    set((state) => ({
      edges: [...state.edges, edge],
    }));
  },

  addEdges: (edges) => {
    addEdgesEmit(get().workflowId, edges);
    set((state) => ({
      edges: [...state.edges, ...edges],
    }));
  },

  removeEdge: (edgeId) => {
    removeEdgeEmit(get().workflowId, edgeId);
    set((state) => ({ edges: state.edges.filter((e) => e.id !== edgeId) }));
  },

  //! FACULTIES
  setFaculties: (faculties) => set({ faculties }),

  addFaculty: (faculty) => {
    addFacultyEmit(get().workflowId, faculty);
    set((state) => ({
      faculties: [...state.faculties, faculty],
    }));
  },

  removeFaculty: (facultyId) => {
    removeFacultyEmit(get().workflowId, facultyId);
    set((state) => ({
      faculties: state.faculties.filter((f) => f.id !== facultyId),
    }));
  },

  updateFaculty: (facultyId, facultyData) => {
    updateFacultyEmit(get().workflowId, facultyId, facultyData);
    set((state) => ({
      faculties: state.faculties.map((f) =>
        f.id === facultyId ?  facultyData  : f,
      ),
    }));
  },
}));

export default useWorkflowStore;
