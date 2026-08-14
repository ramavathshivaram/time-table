import type { Edge } from "@xyflow/react";

export const edgeService = {
  add: async (edge: Edge) => {
    // POST /workflows/edges
    console.log("Create edge on server", edge);
  },

  addMany: async (edges: Edge[]) => {
    // POST /workflows/edges/bulk
    console.log("Create edges on server", edges);
  },

  remove: async (id: string) => {
    // DELETE /workflows/edges/:id
    console.log("Delete edge on server", id);
  },

  removeMany: async (ids: string[]) => {
    // DELETE /workflows/edges/bulk
    console.log("Delete edges on server", ids);
  },
};
