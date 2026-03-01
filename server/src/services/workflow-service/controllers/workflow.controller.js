import asyncHandler from "express-async-handler";
import workflowRepository from "../repositorys/workflow.repository.js";

const getAllUserWorkflows = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const workflows =
    await workflowRepository.getAllUserWorkflowsByUserId(userId);
  return res.status(200).json({
    success: true,
    data: workflows,
  });
});

export default { getAllUserWorkflows };
