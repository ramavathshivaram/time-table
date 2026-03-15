import workflowModel from "../models/workflow.model.js";

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

export default { addEdge, addEdges, removeEdge };
