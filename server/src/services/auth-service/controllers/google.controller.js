import AuthModel from "../models/Auth.model.js";
import asyncHandler from "express-async-handler";
import axios from "axios";
import ApiError from "#utils/ApiError.js";
import authRepository from "../repositorys/auth.repository.js";
import { generateRandomPassword } from "../services/password.service.js";

import setAuthCookiesAndRespond from "../services/setAuthCookiesAndRespond.service.js";
import {
  createUserGRPC,
  getUserIdByEmailGRPC,
} from "../../user-service/routes/user.grpc.js";

const googleLogin = asyncHandler(async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized");
  }

  const googleUserData = await getUserDataFromGoogle(accessToken);

  if (!googleUserData?.email) {
    throw new ApiError(400, "Google email not found");
  }

  const auth = await authRepository.getUserByEmail(googleUserData.email);

  if (!auth) {
    throw new ApiError(404, "User not found");
  }

  const userId = await getUserIdByEmailGRPC(googleUserData.email);

  return await setAuthCookiesAndRespond(auth, userId, res, "Login successful");
});

const googleRegister = asyncHandler(async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized");
  }

  const googleUserData = await getUserDataFromGoogle(accessToken);

  if (!googleUserData?.email) {
    throw new ApiError(400, "Google email not found");
  }

  const auth = await authRepository.checkAuthExists({
    email: googleUserData.email,
  });

  if (auth) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await generateRandomPassword();

  const newAuth = await AuthModel.create({
    username: googleUserData.name,
    email: googleUserData.email,
    password: hashedPassword,
  });

  //! save to user model
  const userId = await createUserGRPC({
    userName: googleUserData.name,
    email: googleUserData.email,
    authId: newUser._id,
    avatar: googleUserData.picture,
  });

  return await setAuthCookiesAndRespond(
    newAuth,
    userId,
    res,
    "Registration successful",
  );
});

const getUserDataFromGoogle = async (accessToken) => {
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
