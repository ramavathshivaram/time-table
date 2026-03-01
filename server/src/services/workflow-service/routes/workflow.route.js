import express from "express";
import workflowController from "../controllers/workflow.controller.js";
import getUserId from "../middlewares/getUserId.js";

const router = express.Router();

router.get("/", getUserId, workflowController.getAllUserWorkflows);

export default router;
