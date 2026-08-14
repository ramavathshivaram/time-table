import { useDesignerStore } from "../store/designer.store";
import type { Node } from "../types";

export const nodeService = {
  add: (node: Node) => {
    useDesignerStore.getState().addNode(node);
  },

  remove: (id: string) => {
    useDesignerStore.getState().removeNode(id);
  },

  update: (id: string, nodeData: Partial<Node>) => {
    useDesignerStore.getState().updateNode(id, nodeData);
  },
};
