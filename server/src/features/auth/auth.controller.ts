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

  login: expressAsyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body,
    );

    cookieService.set(res, "refreshToken", refreshToken);

    res.status(200).json({
      success: true,
      user,
      token: accessToken,
    });
  }),

  logout: expressAsyncHandler(async (req: Request, res: Response) => {
    const refreshToken = cookieService.remove(res, "refreshToken");

    await authService.logout(refreshToken);

    cookieService.remove(res, "refreshToken");

    res.status(200).json({
      success: true,
    });
  }),

  refresh: expressAsyncHandler(async (req: Request, res: Response) => {
    const rToken = getCookie(req, "refreshToken");

    const { accessToken, refreshToken } = await authService.refresh(
      rToken as string,
    );

    cookieService.set(res, "refreshToken", refreshToken);

    res.status(200).json({
      success: true,
      token: accessToken,
    });
  }),

  me: expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await authService.me(req.userId);

    res.status(200).json({
      success: true,
      user,
    });
  }),

  forgotPassword: expressAsyncHandler(async (req: Request, res: Response) => {
    await authService.forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message: "Check your email",
    });
  }),

  resetPassword: expressAsyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    const { password } = req.body;

    await authService.resetPassword(token as string, password);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  }),
};
