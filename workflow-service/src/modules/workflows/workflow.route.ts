import express from "express";
import workflowController from "./workflow.controller.js";

const router = express.Router();

router.get("/", workflowController.getAllUserWorkflows);

router.get("/recent", workflowController.getRecentWorkflows);

router.post(
  "/",
  workflowController.createWorkflow,
);

router.get("/:workflowId", workflowController.getWorkflowById);

export default router;
