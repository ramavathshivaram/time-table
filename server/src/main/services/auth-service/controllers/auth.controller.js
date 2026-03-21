import asyncHandler from "express-async-handler";
import ApiError from "#utils/ApiError.js";
import {
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
} from "../services/token.service.js";
import authRepository from "../repositorys/auth.repository.js";
import {
  clearCookie,
  setCookie,
  getCookie,
} from "../services/cookie.service.js";
import { REFRESH_TOKEN_EXPIRES_IN } from "../lib/const.js";

const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = getCookie(req, "refreshToken");

  const refreshData = verifyToken(refreshToken, "refresh");

  const { tokenVersion, authId } = refreshData;

  const auth = await authRepository.findUserById(authId);

  if (!auth) {
    throw new ApiError(404, "User not found");
  }

  if (tokenVersion !== auth.tokenVersion) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newRefreshToken = generateRefreshToken(
    refreshData.userId,
    authId,
    auth.tokenVersion,
  );

  await authRepository.findUserByIdAndUpdate(authId, {
    refreshToken: newRefreshToken,
  });

  setCookie(res, "refreshToken", newRefreshToken);

  const newAccessToken = generateAccessToken(
    refreshData.userId,
    authId,
    auth.tokenVersion,
  );

  res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
    token: newAccessToken,
  });
});

const logout = asyncHandler(async (req, res) => {
  await authRepository.findUserByIdAndUpdate(req.authId, {
    refreshToken: null,
  });

  clearCookie(res, "refreshToken");

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
