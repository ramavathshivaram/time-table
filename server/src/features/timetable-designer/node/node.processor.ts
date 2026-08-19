import type { Node } from "./node.model.js";

import { nodeRepository } from "./node.repository.js";

export const nodeProcessor = {
  add: async (node: Node) => {
    return nodeRepository.create(node);
  },

  addMany: async (nodes: Node[]) => {
    return nodeRepository.createMany(nodes);
  },

  update: async (node: Node) => {
    return nodeRepository.update(node.designerId, node.id, node);
  },

  remove: async (designerId: string, nodeId: string) => {
    return nodeRepository.delete(designerId, nodeId);
  },

  removeMany: async (designerId: string, nodeIds: string[]) => {
    return nodeRepository.deleteMany(designerId, nodeIds);
  },
};
