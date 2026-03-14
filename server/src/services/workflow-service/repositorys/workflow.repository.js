import workflowModel from "../models/workflow.model.js";

const getAllUserWorkflowsByUserId = async (userId, options = {}) => {
  const { skip = 0, limit = 10, sort = { title: 1 } } = options;

  return workflowModel
    .find({ userId })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

const getRecentWorkflowsByUserId = async (userId) => {
  return workflowModel.find({ userId }).sort({ updatedAt: -1 }).limit(5).lean();
};

const createWorkflow = async (workflow) => {
  return await workflowModel.create(workflow);
};

const getWorkflowById = async (workflowId) => {
  return await workflowModel.findById(workflowId);
};

const updateWorkflowById = async (workflowId, data) => {
  await workflowModel.findByIdAndUpdate(workflowId, data);
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

const addFaculty = async (workflowId, faculty) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { faculties: faculty },
  });
};

const removeFaculty = async (workflowId, faculty) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { faculties: { id: faculty } },
  });
};

const updateFaculty = async (workflowId, facultyId, facultyData) => {
  await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "faculties.id": facultyId,
    },
    {
      $set: {
        "faculties.$": facultyData,
      },
    },
  );
};

export default {
  getAllUserWorkflowsByUserId,
  createWorkflow,
  getWorkflowById,
  updateWorkflowById,
  getRecentWorkflowsByUserId,
  addNode,
  addNodes,
  removeNode,
  updateNode,
  addEdge,
  addEdges,
  removeEdge,
  addFaculty,
  removeFaculty,
  updateFaculty,
};
