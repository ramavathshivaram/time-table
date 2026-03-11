import asyncHandler from "express-async-handler";
import ApiError from "../../../shared/lib/ApiError.js";
import {
  generateAccessToken,
  verifyToken,
  decodeTokenPayload,
} from "../services/token.service.js";
import authRepository from "../repositorys/auth.repository.js";
import { clearCookie, setCookie } from "../services/cookie.service.js";

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

  const auth = await authRepository.findUserById(authId);

  if (!auth) {
    throw new ApiError(404, "User not found");
  }

  const refreshToken = auth.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token not found");
  }

  const refreshData = verifyToken(refreshToken, false);

  if (!refreshData) {
    throw new ApiError(401, "Refresh token expired");
  }

  const { tokenVersion: refreshTokenVersion } = refreshData;

  if (
    refreshTokenVersion !== accessTokenVersion ||
    refreshTokenVersion !== auth.tokenVersion
  ) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(
    refreshData.userId,
    authId,
    accessTokenVersion,
  );

  setCookie(res, "accessToken", newAccessToken);

  res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
  });
});

const logout = asyncHandler(async (req, res) => {
  await authRepository.findUserByIdAndUpdate(req.authId, {
    refreshToken: null,
  });

  clearCookie(res, "accessToken");

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
