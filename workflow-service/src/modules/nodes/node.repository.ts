import NodeModel,  {type INode } from "./node.model.js";


const getNode = async (workflowId: INode["workflowId"], nodeId: INode["id"]) => {
  return await  NodeModel.findOne({
    workflowId,
    id: nodeId,
  });
};

const getNodes = async (workflowId: INode["workflowId"]) => {
  return await NodeModel.find({ workflowId });
};

const addNode = async (workflowId: INode["workflowId"], node: Partial<INode>) => {
  return await NodeModel.create({
    ...node,
    workflowId,
  });
};

const addNodes = async (workflowId: INode["workflowId"], nodes: Partial<INode>[]) => {
  const docs = nodes.map((node) => ({
    ...node,
    workflowId,
  }));

  return await NodeModel.insertMany(docs);
};

const removeNode = async (workflowId: INode["workflowId"], nodeId: INode["id"]) => {
  return NodeModel.deleteOne({
    workflowId,
    id: nodeId,
  });
};

const updateNode = async (
  workflowId: INode["workflowId"],
  nodeId: INode["id"],
  updateFields: Partial<INode>,
) => {
  return await NodeModel.findOneAndUpdate(
    {
      workflowId,
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
}