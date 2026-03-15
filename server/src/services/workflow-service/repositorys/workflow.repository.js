import workflowModel from "../models/workflow.model.js";

const getAllUserWorkflowsByUserId = async (userId, options = {}) => {
  const { skip = 0, limit = 10, sort = { title: 1 } } = options;

  return workflowModel
    .find({ userId })
    .select("title createdAt updatedAt _id")
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

const deleteWorkflow = async (workflowId) => {
  await workflowModel.findByIdAndDelete(workflowId);
};

const getRecentWorkflowsByUserId = async (userId) => {
  return workflowModel
    .find({ userId })
    .select("title createdAt updatedAt _id")
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();
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
  deleteWorkflow,
  getWorkflowById,
  updateWorkflowById,
  getRecentWorkflowsByUserId,
};
