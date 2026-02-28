import AuthModel from "../models/Auth.model.js";
import asyncHandler from "express-async-handler";
import axios from "axios";
import ApiError from "../../../shared/lib/ApiError.js";
import { generateTokens, hashPassword } from "../lib/utils.js";
import { COOKIE_EXPIRES_IN } from "../lib/const.js";
import crypto from "crypto";
import authRepository from "../repositorys/auth.repository.js";

import {
  createUserGRPC,
  getUserIdByEmailGRPC,
} from "../../user-service/routes/grpcFunctions.js";

const googleLogin = asyncHandler(async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized");
  }

  const userData = await getUserData(accessToken);

  if (!userData?.email) {
    throw new ApiError(400, "Google email not found");
  }

  const user = await authRepository.getUserByEmail(userData.email);

  if (!user) {
    throw new ApiError(404, "User not found");
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

const googleRegister = asyncHandler(async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized");
  }

  const userData = await getUserData(accessToken);

  if (!userData?.email) {
    throw new ApiError(400, "Google email not found");
  }

  const user = await authRepository.getUserByEmail(userData.email);

  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const randomPassword = crypto.randomBytes(16).toString("hex");
  const hashedPassword = await hashPassword(randomPassword);

  const newUser = await AuthModel.create({
    username: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  //! save to user model
  const id = await createUserGRPC({
    userName: userData.name,
    email: userData.email,
    authId: newUser._id,
    avatar: userData.picture,
  });

  // save id cookie
  res.cookie("userId", id, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_EXPIRES_IN,
  });

  return await responseWithCookie(newUser, res, "Registration successful");
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

const getUserData = async (accessToken) => {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    throw new ApiError(401, "Invalid Google token");
  }
};

export default {
  googleLogin,
  googleRegister,
};
