import type { Edge } from "@xyflow/react";

import { edgeSocket } from "../socket/edge.socket";

export const edgeService = {
  add: async (designerId: string, edge: Edge) => {
    return edgeSocket.create(designerId, edge);
  },

  addMany: async (designerId: string, edges: Edge[]) => {
    return edgeSocket.createMany(designerId, edges);
  },

  remove: async (designerId: string, edgeId: string) => {
    return edgeSocket.delete(designerId, edgeId);
  },

  removeMany: async (designerId: string, edgeIds: string[]) => {
    return edgeSocket.deleteMany(designerId, edgeIds);
  },
};
