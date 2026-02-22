import AuthModel from "../models/Auth.model.js";
import asyncHandler from "express-async-handler";
import ApiError from "../lib/ApiError.js";
import { generateTokens, hashPassword } from "../lib/utils.js";
import { COOKIE_EXPIRES_IN } from "../lib/const.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await AuthModel.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatched = await user.isPasswordMatched(password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = generateTokens(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_EXPIRES_IN,
  });

  res.json({
    message: "Login successful",
    success: true,
    data: {
      username: user.username,
      email: user.email,
    },
  });
});

const register = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const userExits = await AuthModel.findOne({ email });

  if (userExits) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await AuthModel.create({
    userName,
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = generateTokens(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_EXPIRES_IN,
  });

  res.json({
    message: "Registration successful",
    success: true,
    data: {
      username: user.username,
      email: user.email,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  await AuthModel.findOneAndUpdate({ _id: req.userId }, { refreshToken: null });

  res.clearCookie("accessToken");

  res.json({
    message: "Logout successful",
    success: true,
  });
});

export default {
  login,
  register,
  logout,
};
