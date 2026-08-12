import { create } from "zustand";
import type { Designer, Node } from "../types";

type DesignerState = {
  init: (data: Designer) => void;
  addNode: (node: Node) => void;
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
}));
