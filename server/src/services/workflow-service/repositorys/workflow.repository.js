import workflowModel from "../models/workflow.model.js";

const getAllUserWorkflowsByUserId = async (userId) => {
  return await workflowModel.find({ userId });
};

export default {
  getAllUserWorkflowsByUserId,
};
