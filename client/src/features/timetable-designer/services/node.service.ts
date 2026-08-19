import type { Node } from "@xyflow/react";

import { nodeSocket } from "../socket/node.socket";

export const nodeService = {
  add: (designerId: string, node: Node) => {
    return nodeSocket.create(designerId, node);
  },

  addMany: (designerId: string, nodes: Node[]) => {
    return nodeSocket.createMany(designerId, nodes);
  },

  update: (designerId: string, nodeId: string, data: Partial<Node>) => {
    return nodeSocket.update(designerId, nodeId, data);
  },

  remove: (designerId: string, nodeId: string) => {
    return nodeSocket.delete(designerId, nodeId);
  },

  removeMany: (designerId: string, nodeIds: string[]) => {
    return nodeSocket.deleteMany(designerId, nodeIds);
  },
};
