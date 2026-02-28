import express from "express";
import userContoller from "../controllers/user.contoller.js";
import validateRequest from "../../../shared/middlewares/validateRequest.js";
import zodSchema from "../lib/zodSchema.js";

import getUserId from "../middlewares/getUserId.js";

const router = express.Router();

router.get("/", getUserId, userContoller.getUserById);

router.put(
  "/dark-mode",
  validateRequest(zodSchema.darkModeSchema),
  getUserId,
  userContoller.updateDarkMode,
);

export default router;
