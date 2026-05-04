import nodeController from "./node.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", nodeController.getNodes);

router.get("/:nodeId", nodeController.getNode);

router.post("/", nodeController.addNode);

router.post("/:workflowId/bulk", nodeController.addNodes);

router.put("/", nodeController.updateNode);

router.delete("/", nodeController.removeNode);

export default router;