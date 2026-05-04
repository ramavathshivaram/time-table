import NodeModel, { type INode } from "./node.model.js";

const getNode = async (nodeId: INode["id"]): Promise<INode | null> => {
  return NodeModel.findOne({
    id: nodeId,
  });
};

const getNodes = async (workflowId: INode["workflowId"]): Promise<INode[]> => {
  return NodeModel.find({ workflowId });
};

const addNode = async (
  workflowId: INode["workflowId"],
  node: Partial<INode>,
): Promise<INode> => {
  return NodeModel.create({
    ...node,
    workflowId,
  });
};

const addNodes = async (
  workflowId: INode["workflowId"],
  nodes: Partial<INode>[],
): Promise<INode[]> => {
  const docs = nodes.map((node) => ({
    ...node,
    workflowId,
  }));

  return NodeModel.insertMany(docs);
};

const removeNode = async (nodeId: INode["id"]): Promise<any> => {
  return NodeModel.deleteOne({
    id: nodeId,
  });
};

const updateNode = async (
  nodeId: INode["id"],
  updateFields: Partial<INode>,
): Promise<INode | null> => {
  return NodeModel.findOneAndUpdate(
    {
      id: nodeId,
    },
    updateFields,
    { new: true },
  );
};

export default {
  getNode,
  getNodes,
  addNode,
  addNodes,
  removeNode,
  updateNode,
};
