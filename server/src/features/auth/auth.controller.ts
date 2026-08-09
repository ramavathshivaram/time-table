import type { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import { authService } from "./auth.service.js";
import { cookieService } from "./services/cookie.service.js";

export const authController = {
  register: expressAsyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await authService.register(
      req.body,
    );

    cookieService.set(res, "refreshToken", refreshToken);

    res.status(201).json({
      success: true,
      user,
      token: accessToken,
    });
  }),

  login: expressAsyncHandler((req: Request, res: Response) => {}),

  logout: expressAsyncHandler((req: Request, res: Response) => {}),

  refresh: expressAsyncHandler((req: Request, res: Response) => {}),

  me: expressAsyncHandler((req: Request, res: Response) => {}),

  forgotPassword: expressAsyncHandler((req: Request, res: Response) => {}),

  resetPassword: expressAsyncHandler((req: Request, res: Response) => {}),
};
