import express from "express";

//! shared
import validateRequest from "../../../shared/middlewares/validateRequest.js";
import verifyJwtToken from "../../../shared/middlewares/verifyJwtToken.js";

import authController from "../controllers/auth.controller.js";
import googleController from "../controllers/google.controller.js";
import forgotPasswordController from "../controllers/forgotPassword.controller.js";

import zodSchema from "../lib/zodSchema.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest(zodSchema.registerSchema),
  authController.register,
);

router.post(
  "/login",
  validateRequest(zodSchema.loginSchema),
  authController.login,
);

router.get("/auth-check", verifyJwtToken, authController.authCheck);

router.get("/refresh-token", authController.refreshTokenController);

router.post("/logout", authController.logout);

router.post(
  "/google-login",
  validateRequest(zodSchema.googleLoginSchema),
  googleController.googleLogin,
);

router.post(
  "/google-register",
  validateRequest(zodSchema.googleRegisterSchema),
  googleController.googleRegister,
);

router.post(
  "/forgot-password",
  validateRequest(zodSchema.forgotPasswordSchema),
  forgotPasswordController.forgotPassword,
);

router.post(
  "/verify-otp",
  validateRequest(zodSchema.verifyOTPSchema),
  forgotPasswordController.verifyOTP,
);

router.post(
  "/reset-password",
  validateRequest(zodSchema.resetPasswordSchema),
  forgotPasswordController.resetPassword,
);

export default router;
