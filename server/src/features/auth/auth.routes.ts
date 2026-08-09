import express from "express";
import { authController } from "./auth.controller.js";
import { requestValidator } from "#utils/request-validator.js";
import { authSchema } from "./schemas/auth.schema.js";

export const authRouter: express.Router = express.Router();

authRouter.post(
  "/register",
  requestValidator(authSchema.register),
  authController.register,
);

authRouter.post(
  "/login",
  requestValidator(authSchema.login),
  authController.login,
);

authRouter.get("/me", authController.me);

authRouter.post("/logout", authController.logout);

authRouter.post(
  "/forgot-password",
  requestValidator(authSchema.forgotPassword),
  authController.forgotPassword,
);

authRouter.get("/refresh", authController.refresh);

authRouter.post(
  "/reset-password",
  requestValidator(authSchema.resetPassword),
  authController.resetPassword,
);
