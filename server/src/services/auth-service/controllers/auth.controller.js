import asyncHandler from "express-async-handler";
import ApiError from "#utils/ApiError.js";
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

  const { authId, tokenVersion: accessTokenVersion } = accessData;

  const auth = await authRepository.findUserById(authId);

  if (!auth) {
    throw new ApiError(404, "User not found");
  }

  const refreshData = verifyToken(auth.refreshToken, false);

  const { tokenVersion: refreshTokenVersion } = refreshData;

  if (
    refreshTokenVersion !== accessTokenVersion ||
    refreshTokenVersion !== auth.tokenVersion
  ) {
    throw new ApiError(401, "Invalid access token");
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
