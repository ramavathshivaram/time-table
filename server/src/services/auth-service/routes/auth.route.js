import express from "express";

//! shared
import validateRequest from "../../../shared/middlewares/validateRequest.js";
import verifyJwtToken from "../../../shared/middlewares/verifyJwtToken.js";

import localController from "../controllers/local.controller.js";
import googleController from "../controllers/google.controller.js";
import authController from "../controllers/auth.controller.js";
import forgotPasswordController from "../controllers/forgotPassword.controller.js";

import zodSchema from "../lib/zodSchema.js";

const router = express.Router();

//! local auth routes
router.post(
  "/register",
  validateRequest(zodSchema.registerSchema),
  localController.register,
);

router.post(
  "/login",
  validateRequest(zodSchema.loginSchema),
  localController.login,
);

//! google auth routes
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

//! common auth routes
router.get("/auth-check", verifyJwtToken, authController.authCheck);

router.get("/refresh-token", authController.refreshTokenController);

router.post("/logout", verifyJwtToken, authController.logout);

//! forgot password routes
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
