import AuthModel from "../models/Auth.model.js";
import asyncHandler from "express-async-handler";
import axios from "axios";
import ApiError from "../lib/ApiError.js";
import { generateTokens, hashPassword } from "../lib/utils.js";
import { COOKIE_EXPIRES_IN } from "../lib/const.js";

const googleLogin = asyncHandler(async (req, res) => {
  const { accessToken } = req.body;

  const userData = await getUserData(accessToken);

  const user = await AuthModel.findOne({ email: userData.email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return await responseWithCookie(user, res, "login successful");
});

const googleRegister = asyncHandler(async (req, res) => {
  const { accessToken } = req.body;

  const userData = await getUserData(accessToken);

  const user = await AuthModel.findOne({ email: userData.email });

  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await hashPassword(userData.email);

  const newUser = await AuthModel.create({
    username: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  return await responseWithCookie(newUser, res, "Registration successful");
});

const responseWithCookie = async (user, res, msg) => {
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

    console.log("Google User:", res.data);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export default {
  googleLogin,
  googleRegister,
};
