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

export default {
  getAllUserWorkflowsByUserId,
  createWorkflow,
  getWorkflowById,
  updateWorkflowById,
  getRecentWorkflowsByUserId,
};
