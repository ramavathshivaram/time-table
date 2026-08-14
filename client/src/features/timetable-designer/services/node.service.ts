import type { Node } from "@xyflow/react";

export const nodeService = {
  add: async (node: Node) => {
    // POST /workflows/nodes
    console.log("Create node on server", node);
  },

  addMany: async (nodes: Node[]) => {
    // POST /workflows/nodes/bulk
    console.log("Create nodes on server", nodes);
  },

  update: async (id: string, data: Partial<Node>) => {
    // PATCH /workflows/nodes/:id
    console.log("Update node on server", id, data);
  },

  remove: async (id: string) => {
    // DELETE /workflows/nodes/:id
    console.log("Delete node on server", id);
  },

  removeMany: async (ids: string[]) => {
    // DELETE /workflows/nodes/bulk
    console.log("Delete nodes on server", ids);
  },
};
