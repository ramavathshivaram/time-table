import express from "express";
import authController from "../controllers/auth.controller.js";
import googleController from "../controllers/google.controller.js";
import forgotPasswordController from "../controllers/forgotPassword.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  verifyOTPSchema,
  resetPasswordSchema,
  googleLoginSchema,
  googleRegisterSchema,
} from "../lib/zodSchema.js";

import verifyJwtToken from "../middlewares/verifyJwtToken.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);

router.post("/login", validateRequest(loginSchema), authController.login);

router.get("/auth-check", verifyJwtToken, authController.authCheck);

router.get("/refresh-token", authController.refreshTokenController);

router.get("/logout", authController.logout);

router.post(
  "/google-login",
  validateRequest(googleLoginSchema),
  googleController.googleLogin,
);

router.post(
  "/google-register",
  validateRequest(googleRegisterSchema),
  googleController.googleRegister,
);

router.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  forgotPasswordController.forgotPassword,
);

router.post(
  "/verify-otp",
  validateRequest(verifyOTPSchema),
  forgotPasswordController.verifyOTP,
);

router.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  forgotPasswordController.resetPassword,
);

export default router;
