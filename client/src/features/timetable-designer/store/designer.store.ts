import { create } from "zustand";
import type { Designer, Node } from "../types";
import type { Edge } from "@xyflow/react";

type DesignerState = {
  init: (data: Designer) => void;
  addNode: (node: Node) => void;
  removeNode: (id: string) => void;
  updateNode: (id: string, nodeData: Partial<Node>) => void;

  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
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

  addNode: (node: Node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  removeNode(id: string) {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
    }));
  },

  updateNode(id: string, nodeData: Partial<Node>) {
    set((state) => ({
      nodes: state.nodes.map((n) => (n.id === id ? { ...n, ...nodeData } : n)),
    }));
  },

  addEdge: (edge: Edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
    })),

  removeEdge(id: string) {
    set((state) => ({
      edges: state.edges.filter((e) => e.id !== id),
    }));
  },
}));
