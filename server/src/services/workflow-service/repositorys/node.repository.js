import workflowModel from "../models/workflow.model.js";

const getNode = async (workflowId, nodeId) => {
  const result = await workflowModel.findOne(
    {
      _id: workflowId,
      "nodes.id": nodeId,
    },
    { "nodes.$": 1 },
  );

  return result?.nodes?.[0] || null;
};

const getNodes = async (workflowId) => {
  const result = await workflowModel.findOne(
    {
      _id: workflowId,
    },
    { nodes: 1 },
  );

  return result?.nodes || null;
};

const addNode = async (workflowId, node) => {
  await workflowModel.findByIdAndUpdate(workflowId, { $push: { nodes: node } });
};

const addNodes = async (workflowId, nodes) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { nodes: { $each: nodes } },
  });
};

const removeNode = async (workflowId, nodeId) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { nodes: { id: nodeId } },
  });
};

const updateNode = async (workflowId, nodeId, nodeData) => {
  const r = await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "nodes.id": nodeId,
    },
    {
      $set: {
        "nodes.$.data": nodeData,
      },
    },
  );
};

export default { getNode, getNodes, addNode, addNodes, removeNode, updateNode };
