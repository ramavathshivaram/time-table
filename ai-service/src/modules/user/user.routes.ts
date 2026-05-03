import express from "express";
import userContoller from "./user.contoller.js";
import validateRequest from "#middlewares/validateRequest.js";
import zodSchema from "#utils/zodSchema.js";
import authenticate from "#middlewares/authenticate.js";

const router = express.Router();

router.get("/",authenticate, userContoller.getUserById);

router.put(
  "/dark-mode",
  authenticate,
  validateRequest(zodSchema.darkModeSchema),
  userContoller.updateDarkMode,
);

router.post("/", userContoller.createUser);

export default router;
