import workflowModel from "../models/workflow.model.js";

const getAllUserWorkflowsByUserId = async (userId) => {
  return await workflowModel.find({ userId });
};

const createWorkflow = async (workflow) => {
  return await workflowModel.create(workflow);
};

const getWorkflowById = async (workflowId) => {
  return await workflowModel.findById(workflowId);
};

const updateWorkflowById = async (workflowId, data) => {
  const workflow = await workflowModel.findByIdAndUpdate(workflowId, data);
  console.log(workflow);
};

export default {
  getAllUserWorkflowsByUserId,
  createWorkflow,
  getWorkflowById,
  updateWorkflowById,
};
