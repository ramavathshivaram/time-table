import { useDesignerStore } from "../store/designer.store";
import type { Node } from "../types";

export const nodeService = {
  add: (node: Node) => {
    useDesignerStore.getState().addNode(node);
  },

  addMany: (nodes: Node[]) => {
    useDesignerStore.getState().addNodes(nodes);
  },

  remove: (id: string) => {
    useDesignerStore.getState().removeNode(id);
  },

  removeMany: (ids: string[]) => {
    useDesignerStore.getState().removeNodes(ids);
  },

  update: (id: string, data: Partial<Node>) => {
    useDesignerStore.getState().updateNode(id, data);
  },

  updateMany: (data: Partial<Node>) => {
    useDesignerStore.getState().updateNodes(data);
  },
};
