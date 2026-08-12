import { useDesignerStore } from "../store/designer.store";
import type { Node } from "../types";

export const nodeService = {
  add: (node: Partial<Node>) => {
    useDesignerStore.getState().addNode(node);
  },
  remove: () => {},
  update: () => {},
};
