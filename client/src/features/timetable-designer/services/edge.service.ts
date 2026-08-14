import type { Edge } from "@xyflow/react";
import { useDesignerStore } from "../store/designer.store";

export const edgeService = {
  add: (edge: Edge) => {
    useDesignerStore.getState().addEdge(edge);
  },

  remove: (id: string) => {
    useDesignerStore.getState().removeEdge(id);
  },
};
