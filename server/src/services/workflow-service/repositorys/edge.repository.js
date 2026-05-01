import EdgeModel from "../models/edge.model.js";
import logger from "#configs/logger.js";

const getEdge = async (workflowId, edgeId) => {
  try {
    const edge = await EdgeModel.findOne({
      workflowId,
      id: edgeId,
    });

    return edge || null;
  } catch (error) {
    logger.error("Error in getEdge", {
      workflowId,
      edgeId,
      error: error.message,
    });
    return null;
  }
};

const getEdges = async (workflowId) => {
  try {
    return await EdgeModel.find({ workflowId }).lean();
  } catch (error) {
    logger.error("Error in getEdges", {
      workflowId,
      error: error.message,
    });
    return [];
  }
};

const addEdge = async (workflowId, edge) => {
  try {
    return await EdgeModel.create({
      ...edge,
      workflowId,
    });
  } catch (error) {
    logger.error("Error in addEdge", {
      workflowId,
      edge,
      error: error.message,
    });
    return null;
  }
};

const addEdges = async (workflowId, edges) => {
  try {
    const docs = edges.map((edge) => ({
      ...edge,
      workflowId,
    }));

    return await EdgeModel.insertMany(docs);
  } catch (error) {
    logger.error("Error in addEdges", {
      workflowId,
      edgesCount: edges?.length,
      error: error.message,
    });
    return [];
  }
};

const removeEdge = async (workflowId, edgeId) => {
  try {
    return await EdgeModel.deleteOne({
      workflowId,
      id: edgeId,
    });
  } catch (error) {
    logger.error("Error in removeEdge", {
      workflowId,
      edgeId,
      error: error.message,
    });
    return null;
  }
};

const updateEdge = async (workflowId, edgeId, updateFields) => {
  try {
    const setQuery = {};

    for (const key in updateFields) {
      setQuery[key] = updateFields[key];
    }

    return await EdgeModel.findOneAndUpdate(
      { workflowId, id: edgeId },
      { $set: setQuery },
      { new: true, runValidators: true },
    );
  } catch (error) {
    logger.error("Error in updateEdge", {
      workflowId,
      edgeId,
      updateFields,
      error: error.message,
    });
    return null;
  }
};

export default {
  getEdge,
  getEdges,
  addEdge,
  addEdges,
  removeEdge,
  updateEdge,
};
