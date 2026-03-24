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
import {
  getSession,
  updateSession,
  deleteSession,
} from "../services/session.service.js";

const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = getCookie(req, "refreshToken");

  const refreshData = verifyToken(refreshToken, "refresh");

  const { tokenVersion, authId } = refreshData;

  const session = await getSession(authId);

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  if (tokenVersion !== session.tokenVersion) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newRefreshToken = generateRefreshToken(
    refreshData.userId,
    authId,
    tokenVersion,
  );

  setCookie(res, "refreshToken", newRefreshToken);

  const newAccessToken = generateAccessToken(
    refreshData.userId,
    authId,
    tokenVersion,
  );

  await updateSession(authId, session.tokenVersion);

  res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
    token: newAccessToken,
  });
});

const logout = asyncHandler(async (req, res) => {
  clearCookie(res, "refreshToken");

  await deleteSession(req.authId);

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
