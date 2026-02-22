import express from "express";
import authController from "../controllers/auth.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { loginSchema, registerSchema } from "../lib/zodSchema.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);

router.post("/login", validateRequest(loginSchema), authController.login);

export default router;
