import workflowModel from "../models/workflow.model.js";

const getEdge = async (workflowId, edgeId) => {
  const workflow = await workflowModel
    .findById(workflowId)
    .select("edges")
    .lean();

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow.edges.find((edge) => edge.id === edgeId);
};

const getEdges = async (workflowId) => {
  const workflow = await workflowModel
    .findById(workflowId)
    .select("edges")
    .lean();

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow.edges;
};

const addEdge = async (workflowId, edge) => {
  await workflowModel.findByIdAndUpdate(workflowId, { $push: { edges: edge } });
};

const addEdges = async (workflowId, edges) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { edges: { $each: edges } },
  });
};

const removeEdge = async (workflowId, edgeId) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { edges: { id: edgeId } },
  });
};

export default {
  getEdge,
  getEdges,
  addEdge,
  addEdges,
  removeEdge,
};
