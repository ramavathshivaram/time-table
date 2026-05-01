import NodeModel from "../models/node.model.js";
import logger from "#configs/logger.js";

const getNode = async (workflowId, nodeId) => {
  try {
    const node = await NodeModel.findOne({
      workflowId,
      id: nodeId,
    });

    return node || null;
  } catch (error) {
    logger.error("Error in getNode", {
      workflowId,
      nodeId,
      error: error.message,
    });
    return null;
  }
};

const getNodes = async (workflowId) => {
  try {
    return await NodeModel.find({ workflowId });
  } catch (error) {
    logger.error("Error in getNodes", {
      workflowId,
      error: error.message,
    });
    return [];
  }
};

const addNode = async (workflowId, node) => {
  try {
    return await NodeModel.create({
      ...node,
      workflowId,
    });
  } catch (error) {
    logger.error("Error in addNode", {
      workflowId,
      node,
      error: error.message,
    });
    return null;
  }
};

const addNodes = async (workflowId, nodes) => {
  try {
    const docs = nodes.map((node) => ({
      ...node,
      workflowId,
    }));

    return await NodeModel.insertMany(docs);
  } catch (error) {
    logger.error("Error in addNodes", {
      workflowId,
      nodesCount: nodes?.length,
      error: error.message,
    });
    return [];
  }
};

const removeNode = async (workflowId, nodeId) => {
  try {
    return await NodeModel.deleteOne({
      workflowId,
      id: nodeId,
    });
  } catch (error) {
    logger.error("Error in removeNode", {
      workflowId,
      nodeId,
      error: error.message,
    });
    return null;
  }
};

const updateNode = async (workflowId, nodeId, updateFields) => {
  try {
    return await NodeModel.findOneAndUpdate(
      {
        workflowId,
        id: nodeId,
      },
      { ...updateFields },
    );
  } catch (error) {
    logger.error("Error in updateNode", {
      workflowId,
      nodeId,
      updateFields,
      error: error.message,
    });
    return null;
  }
};

export default {
  getNode,
  getNodes,
  addNode,
  addNodes,
  removeNode,
  updateNode,
};
