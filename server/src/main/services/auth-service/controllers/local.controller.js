import asyncHandler from "express-async-handler";
import ApiError from "#utils/ApiError.js";
import {
  hashPassword,
  isPasswordMatched,
} from "../services/password.service.js";
import setAuthCookiesAndRespond from "../services/setAuthCookiesAndRespond.service.js";

import authRepository from "../repositorys/auth.repository.js";

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

  return await setAuthCookiesAndRespond(auth, userId, res, "Login successful");
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

  return await setAuthCookiesAndRespond(
    auth,
    userId,
    res,
    "Registration successful",
  );
});

export default {
  login,
  register,
};
