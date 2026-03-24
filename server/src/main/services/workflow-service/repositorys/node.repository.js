import NodeModel from "../models/node.model.js";

const getNode = async (workflowId, nodeId) => {
  const node = await NodeModel.findOne({
    workflowId,
    id: nodeId,
  });

  return node || null;
};

const getNodes = async (workflowId) => {
  return NodeModel.find({ workflowId });
};

const addNode = async (workflowId, node) => {
  return NodeModel.create({
    ...node,
    workflowId,
  });
};

const addNodes = async (workflowId, nodes) => {
  const docs = nodes.map((node) => ({
    ...node,
    workflowId,
  }));

  return NodeModel.insertMany(docs);
};


const removeNode = async (workflowId, nodeId) => {
  return NodeModel.deleteOne({
    workflowId,
    id: nodeId,
  });
};

const updateNode = async (workflowId, nodeId, updateFields) => {
  const setQuery = {};

  for (const key in updateFields) {
    setQuery[key] = updateFields[key];
  }

  return NodeModel.findOneAndUpdate(
    {
      workflowId,
      id: nodeId,
    },
    { $set: setQuery },
    { new: true, runValidators: true }
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