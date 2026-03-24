import EdgeModel from "../models/edge.model.js";

const getEdge = async (workflowId, edgeId) => {
  const edge = await EdgeModel.findOne({
    workflowId,
    id: edgeId,
  });

  return edge || null;
};

const getEdges = async (workflowId) => {
  return EdgeModel.find({ workflowId }).lean();
};


const addEdge = async (workflowId, edge) => {
  return EdgeModel.create({
    ...edge,
    workflowId,
  });
};

const addEdges = async (workflowId, edges) => {
  const docs = edges.map((edge) => ({
    ...edge,
    workflowId,
  }));

  return EdgeModel.insertMany(docs);
};

const removeEdge = async (workflowId, edgeId) => {
  return EdgeModel.deleteOne({
    workflowId,
    id: edgeId,
  });
};

const updateEdge = async (workflowId, edgeId, updateFields) => {
  const setQuery = {};

  for (const key in updateFields) {
    setQuery[key] = updateFields[key];
  }

  return EdgeModel.findOneAndUpdate(
    { workflowId, id: edgeId },
    { $set: setQuery },
    { new: true, runValidators: true }
  );
};

export default {
  getEdge,
  getEdges,
  addEdge,
  addEdges,
  removeEdge,
  updateEdge,
};