import express from "express";

//! shared
import validateRequest from "#shared/middlewares/validateRequest.js";
import authenticate from "#shared/middlewares/authenticate.js";
import {
  rateLimiterMiddleware,
  otpLimiter,
  authLimiter,
  refreshLimiter,
  authCheckLimiter,
} from "../middlewares/rateLimiter.js";

import localController from "../controllers/local.controller.js";
import googleController from "../controllers/google.controller.js";
import authController from "../controllers/auth.controller.js";
import forgotPasswordController from "../controllers/forgotPassword.controller.js";

import zodSchema from "../lib/zodSchema.js";

const router = express.Router();

//! local auth routes
router.post(
  "/register",
  rateLimiterMiddleware(authLimiter),
  validateRequest(zodSchema.registerSchema),
  localController.register,
);

router.post(
  "/login",
  rateLimiterMiddleware(authLimiter),
  validateRequest(zodSchema.loginSchema),
  localController.login,
);

//! google auth routes
router.post(
  "/google-login",
  rateLimiterMiddleware(authLimiter),
  validateRequest(zodSchema.googleLoginSchema),
  googleController.googleLogin,
);

router.post(
  "/google-register",
  rateLimiterMiddleware(authLimiter),
  validateRequest(zodSchema.googleRegisterSchema),
  googleController.googleRegister,
);

//! common auth routes
router.get(
  "/auth-check",
  authenticate,
  rateLimiterMiddleware(authCheckLimiter),
  authController.authCheck,
);

router.get(
  "/refresh-token",
  rateLimiterMiddleware(refreshLimiter),
  authController.refreshTokenController,
);

router.post("/logout", authenticate, authController.logout);

//! forgot password routes
router.post(
  "/forgot-password",
  rateLimiterMiddleware(otpLimiter),
  validateRequest(zodSchema.forgotPasswordSchema),
  forgotPasswordController.forgotPassword,
);

router.post(
  "/verify-otp",
  rateLimiterMiddleware(otpLimiter),
  validateRequest(zodSchema.verifyOTPSchema),
  forgotPasswordController.verifyOTP,
);

router.post(
  "/reset-password",
  rateLimiterMiddleware(otpLimiter),
  validateRequest(zodSchema.resetPasswordSchema),
  forgotPasswordController.resetPassword,
);

export default router;
