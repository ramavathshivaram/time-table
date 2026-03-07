import asyncHandler from "express-async-handler";
import ApiError from "../../../shared/lib/ApiError.js";
import {
  generateAccessToken,
  verifyToken,
  decodeTokenPayload,
} from "../lib/utils.js";

import { COOKIE_EXPIRES_IN } from "../lib/const.js";

import authRepository from "../repositorys/auth.repository.js";

import { getUserIdByEmailGRPC } from "../../user-service/routes/user.grpc.js";

const refreshTokenController = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Access token not found");
  }

  const accessData = decodeTokenPayload(accessToken);

  if (!accessData) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  const { authId, tokenVersion: accessTokenVersion } = accessData;

  const user = await authRepository.findUserById(authId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const refreshToken = user.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token not found");
  }

  const refreshData = verifyToken(refreshToken);

  if (!refreshData) {
    throw new ApiError(401, "Refresh token expired");
  }

  const { tokenVersion: refreshTokenVersion } = refreshData;

  if (
    refreshTokenVersion !== accessTokenVersion ||
    refreshTokenVersion !== user.tokenVersion
  ) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(authId, accessTokenVersion);

  const id = await getUserIdByEmailGRPC(user.email);
  // save id cookie
  res.cookie("userId", id, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_EXPIRES_IN,
  });

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_EXPIRES_IN,
  });

  res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
  });
});

const logout = asyncHandler(async (req, res) => {
  await authRepository.findUserByIdAndUpdate(req.userId, {
    refreshToken: null,
  });

  res.clearCookie("accessToken");

  res.json({
    message: "Logout successful",
    success: true,
  });
});

const authCheck = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
  });
});

export default {
  logout,
  authCheck,
  refreshTokenController,
};
