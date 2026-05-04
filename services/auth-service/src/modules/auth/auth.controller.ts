import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import { getCookie, setCookie, clearCookie } from "#services/cookie.service.js";
import {
  getSession,
  setSession,
  deleteSession,
} from "#services/session.service.js";
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "#services/token.service.js";
import ApiError from "#utils/ApiError.js";
import type { Types } from "mongoose";

// ---------- TYPES ----------
interface TokenPayload {
  userId: Types.ObjectId;
  authId: Types.ObjectId;
  tokenVersion: number;
  type: "access" | "refresh";
}

// ---------- REFRESH ----------
const refreshTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = getCookie(req, "refreshToken");

    const refreshData:TokenPayload = verifyRefreshToken(refreshToken);

    const { tokenVersion, authId, userId } = refreshData;

    const session = await getSession(authId);

    if (!session) {
      throw new ApiError(404, "Session not found");
    }

    if (tokenVersion !== session.tokenVersion) {
      throw new ApiError(404, "Invalid refresh token");
    }

    const newRefreshToken = generateRefreshToken(
      userId,
      authId,
      tokenVersion
    );

    setCookie(res, "refreshToken", newRefreshToken);

    const newAccessToken = generateAccessToken(
      userId,
      tokenVersion
    );

    await setSession(authId, session.tokenVersion);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      token: newAccessToken,
    });
  }
);

// ---------- LOGOUT ----------
const logout = asyncHandler(async (req: Request, res: Response) => {
  if (!req.authId) {
    throw new ApiError(401, "Unauthorized");
  }

  clearCookie(res, "refreshToken");

  await deleteSession(req.authId);

  res.json({
    message: "Logout successful",
    success: true,
  });
});

const authCheck = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
  });
});

export default {
  logout,
  authCheck,
  refreshTokenController,
};