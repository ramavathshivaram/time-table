import express from "express";
import workflowController from "../controllers/workflow.controller.js";

const router = express.Router();

router.get("/", workflowController.getAllUserWorkflows);

router.get("/recent", workflowController.getRecentWorkflows);

router.post("/create-workflow", workflowController.createWorkflow);

router.get("/:workflowId", workflowController.getWorkflowById);

export default router;
