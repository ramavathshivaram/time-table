import asyncHandler from "express-async-handler";
import ApiError from "#utils/ApiError.js";
import {
  hashPassword,
  isPasswordMatched,
} from "../services/password.service.js";

import { generateTokens } from "../services/token.service.js";

import authRepository from "../repositorys/auth.repository.js";

import { setCookie } from "../services/cookie.service.js";

import {
  createUserGRPC,
  getUserIdByEmailGRPC,
} from "../../user-service/routes/user.grpc.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const auth = await authRepository.getUserWithPasswordByEmail(email);

  if (!auth) {
    throw new ApiError(404, "User not found");
  }

  if (!(await isPasswordMatched(password, auth.password))) {
    throw new ApiError(401, "Invalid password");
  }

  const userId = await getUserIdByEmailGRPC(email);

  return await responseWithCookie(auth, userId, res, "Login successful");
});

const register = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const userExists = await authRepository.checkAuthExists({ email });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const auth = await authRepository.createAuth({
    userName,
    email,
    password: hashedPassword,
  });

  const userId = await createUserGRPC({
    userName,
    email,
    authId: auth._id,
  });

  return await responseWithCookie(auth, userId, res, "Registration successful");
});

const responseWithCookie = async (auth, userId, res, msg) => {
  const { accessToken, refreshToken } = generateTokens(
    userId,
    auth._id,
    auth.tokenVersion,
  );

  auth.refreshToken = refreshToken;
  await auth.save();

  setCookie(res, "accessToken", accessToken);

  res.json({
    message: msg,
    success: true,
    data: {
      userName: auth.userName,
      email: auth.email,
    },
  });
};

export default {
  login,
  register,
};
