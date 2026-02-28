import dotenv from "dotenv";
dotenv.config();

import AuthModel from "../models/Auth.model.js";
import asyncHandler from "express-async-handler";
import ApiError from "../../../shared/lib/ApiError.js";
import {
  generateAccessToken,
  generateTokens,
  hashPassword,
  isPasswordMatched,
  verifyToken,
  decodeTokenPayload,
} from "../lib/utils.js";

import { COOKIE_EXPIRES_IN } from "../lib/const.js";

import authRepository from "../repositorys/auth.repository.js";

import {
  createUserGRPC,
  getUserIdByEmailGRPC,
} from "../../user-service/routes/grpcFunctions.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authRepository.getUserWithPasswordByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!(await isPasswordMatched(password, user.password))) {
    throw new ApiError(401, "Invalid password");
  }

  const id = await getUserIdByEmailGRPC(email);
  // save id cookie
  res.cookie("userId", id, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_EXPIRES_IN,
  });

  return await responseWithCookie(user, res, "Login successful");
});

const register = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const userExists = await authRepository.getUserByEmail(email);

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await authRepository.createUser({
    userName,
    email,
    password: hashedPassword,
  });

  //! save to user model
  const id = await createUserGRPC({
    userName,
    email,
    authId: user._id,
  });

  // save id cookie
  res.cookie("userId", id, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_EXPIRES_IN,
  });

  return await responseWithCookie(user, res, "Registration successful");
});

const refreshTokenController = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Access token not found");
  }

  const accessData = decodeTokenPayload(accessToken);

  if (!accessData) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  const { userId, tokenVersion: accessTokenVersion } = accessData;

  const user = await authRepository.findUserById(userId);

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

  const newAccessToken = generateAccessToken(userId, accessTokenVersion);

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

const responseWithCookie = async (user, res, msg) => {
  const { accessToken, refreshToken } = generateTokens(
    user._id,
    user.tokenVersion,
  );

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_EXPIRES_IN,
  });

  res.json({
    message: msg,
    success: true,
    data: {
      username: user.username,
      email: user.email,
    },
  });
};

export default {
  login,
  register,
  logout,
  authCheck,
  refreshTokenController,
};
