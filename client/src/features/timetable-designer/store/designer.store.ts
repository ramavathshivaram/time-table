import { create } from "zustand";
import type { Designer, Node } from "../types";
import type { Edge } from "@xyflow/react";

type DesignerState = {
  init: (data: Designer) => void;

  addNode: (node: Node) => void;
  addNodes: (nodes: Node[]) => void;
  removeNode: (id: string) => void;
  removeNodes: (ids: string[]) => void;
  updateNode: (id: string, nodeData: Partial<Node>) => void;
  updateNodes: (nodeData: Partial<Node>) => void;

  addEdge: (edge: Edge) => void;
  addEdges: (edges: Edge[]) => void;
  removeEdge: (id: string) => void;
  removeEdges: (ids: string[]) => void;
} & Designer;

export const useDesignerStore = create<DesignerState>((set) => ({
  nodes: [],
  edges: [],
  faculties: [],
  subjects: [],
  rooms: [],
  messages: [],

  init: (data) =>
    set({
      nodes: data.nodes,
      edges: data.edges,
    }),

  // ---------------- Nodes ----------------

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  addNodes: (nodes) =>
    set((state) => ({
      nodes: [...state.nodes, ...nodes],
    })),

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
    })),

  removeNodes: (ids) => {
    const idSet = new Set(ids);

    set((state) => ({
      nodes: state.nodes.filter((node) => !idSet.has(node.id)),
      edges: state.edges.filter(
        (edge) => !idSet.has(edge.source) && !idSet.has(edge.target),
      ),
    }));
  },

  updateNode: (id, nodeData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, ...nodeData } : node,
      ),
    })),

  updateNodes: (nodeData) =>
    set((state) => ({
      nodes: state.nodes.map((node) => ({
        ...node,
        ...nodeData,
      })),
    })),

  // ---------------- Edges ----------------

  addEdge: (edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
    })),

  addEdges: (edges) =>
    set((state) => ({
      edges: [...state.edges, ...edges],
    })),

  removeEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
    })),

  removeEdges: (ids) => {
    const idSet = new Set(ids);

    set((state) => ({
      edges: state.edges.filter((edge) => !idSet.has(edge.id)),
    }));
  },
}));
