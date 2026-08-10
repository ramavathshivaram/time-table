import express from "express";
import { authController } from "./auth.controller.js";
import { requestValidator } from "#middlewares/request-validator.js";
import { authSchema } from "./schemas/auth.schema.js";
import { authenticate } from "#middlewares/authenticate.js";

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

authRouter.get("/me", authenticate, authController.me);

authRouter.post("/logout", authenticate, authController.logout);

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
