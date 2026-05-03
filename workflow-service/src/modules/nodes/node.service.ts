import nodeRepository from "./node.repository.js";
import type { INode } from "./node.model.js";

const getNode = async (
  nodeId: INode["id"]
) => {
  const node : INode = await nodeRepository.getNode(nodeId);

  if (!node) {
    throw new Error("Node not found");
  }

  return node;
};

const getNodes = async (workflowId: INode["workflowId"]): Promise<INode>[] => {
  return await nodeRepository.getNodes(workflowId);
};

const addNode = async (
  workflowId: INode["workflowId"],
  node: Partial<INode>
) => {
  if (!node.id) {
    throw new Error("Node id is required");
  }

  return await nodeRepository.addNode(workflowId, node);
};

const addNodes = async (
  workflowId: INode["workflowId"],
  nodes: Partial<INode>[]
) => {
  if (!nodes?.length) {
    throw new Error("Nodes array is empty");
  }
  return await nodeRepository.addNodes(workflowId, nodes);
};

const removeNode = async (
  nodeId: INode["id"]
) => {
  const result: any = await nodeRepository.removeNode( nodeId);

  if (!result?.deletedCount) {
    throw new Error("Node not found or already deleted");
  }
  return result;
};

const updateNode = async (
  nodeId: INode["id"],
  updateFields: Partial<INode>
) => {
  const updated: INode = await nodeRepository.updateNode(
    nodeId,
    updateFields
  );

  if (!updated) {
    throw new Error("Node not found");
  }

  return updated;
};


const nodeService = {
  getNode,
  getNodes,
  addNode,
  addNodes,
  removeNode,
  updateNode,
};

export default nodeService;