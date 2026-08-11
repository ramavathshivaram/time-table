import { create } from "zustand";
import type { Designer } from "../types";

type DesignerState = {
  init: (data: Designer) => void;
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
}));
