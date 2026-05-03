import edgeController from "./edge.controller.js";
import { Router } from "express";

const router = Router();

router.get("/:edgeId", edgeController.getEdge);
router.get("/", edgeController.getEdges);

router.post("/", edgeController.addEdge);
router.post("/:workflowId/bulk", edgeController.addEdges);

router.put("/", edgeController.updateEdge);

router.delete("/", edgeController.removeEdge);

export default router;