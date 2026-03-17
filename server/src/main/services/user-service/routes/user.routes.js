import express from "express";
import userContoller from "../controllers/user.contoller.js";
import validateRequest from "../../../shared/middlewares/validateRequest.js";
import zodSchema from "../lib/zodSchema.js";

const router = express.Router();

router.get("/", userContoller.getUserById);

router.put(
  "/dark-mode",
  validateRequest(zodSchema.darkModeSchema),
  userContoller.updateDarkMode,
);

export default router;
