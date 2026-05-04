import express from "express";

import googleController from "./google.controller.js";
import rateLimiterMiddleware, {
  authLimiter,
} from "#middlewares/rateLimiter.js";
import validateRequest from "#middlewares/validateRequest.js";
import zodSchema from "#utils/zodSchema.js";

const googleRouter = express.Router();

googleRouter.post(
  "/google-login",
  rateLimiterMiddleware(authLimiter),
  validateRequest(zodSchema.googleLoginSchema),
  googleController.login,
);

googleRouter.post(
  "/google-register",
  rateLimiterMiddleware(authLimiter),
  validateRequest(zodSchema.googleRegisterSchema),
  googleController.register,
);

export default googleRouter;
