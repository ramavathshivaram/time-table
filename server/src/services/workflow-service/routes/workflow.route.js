import express from "express";
import workflowController from "../controllers/workflow.controller.js";
import getUserId from "../middlewares/getUserId.js";

const router = express.Router();

router.get("/", getUserId, workflowController.getAllUserWorkflows);

router.post("/create-workflow", getUserId, workflowController.createWorkflow);

router.get("/:workflowId", workflowController.getWorkflowById);

router.put("/:workflowId", workflowController.updateWorkflow);

export default router;
