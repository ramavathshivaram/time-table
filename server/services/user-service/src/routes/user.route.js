import express from "express";
import userController from "../controllers/user.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createUserSchema } from "../lib/zodSchema.js";

const router = express.Router();

router.get("/details", userController.getUserDetails);

router.post(
  "/create",
  validateRequest(createUserSchema),
  userController.createUser,
);

export default router;
