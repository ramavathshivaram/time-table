import express from "express";
import { authController } from "./auth.controller.js";
import { zodValidator } from "#utils/zodValidator.js";
import { authSchema } from "./schemas/auth.schema.js";

export const authRouter: express.Router = express.Router();

authRouter.post(
  "/register",
  zodValidator(authSchema.register),
  authController.register,
);

authRouter.post("/login", authController.login);

authRouter.get("/me", authController.me);

authRouter.post("/logout", authController.logout);

authRouter.post("/forgot-password", authController.forgotPassword);

authRouter.get("/refresh", authController.refresh);

authRouter.post("/reset-password", authController.resetPassword);
