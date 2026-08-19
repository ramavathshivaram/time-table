import type { Edge } from "./edge.model.js";

import { edgeRepository } from "./edge.repository.js";

export const edgeProcessor = {
  add: async (edge: Edge) => {
    return edgeRepository.create(edge);
  },

  addMany: async (edges: Edge[]) => {
    return edgeRepository.createMany(edges);
  },

  remove: async (designerId: string, edgeId: string) => {
    return edgeRepository.delete(designerId, edgeId);
  },

  removeMany: async (designerId: string, edgeIds: string[]) => {
    return edgeRepository.deleteMany(designerId, edgeIds);
  },
};
