import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

import ApiError from "#utils/ApiError.js";
import { hashPassword, isPasswordMatched } from "#services/password.service.js";
import setAuthCookiesAndRespond from "#services/setAuthCookiesAndRespond.service.js";

import authRepository from "#repositories/auth.repository.js";
import { Types } from "mongoose";

// ---------- TYPES ----------
interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  userName: string;
  email: string;
  password: string;
}

// ---------- LOGIN ----------
const login = asyncHandler(
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    const authResponse =
      await authRepository.getUserWithPasswordByEmail(email);

    if (!authResponse || !authResponse.password) {
      throw new ApiError(404, "Auth not found");
    }

    const isMatch = await isPasswordMatched(
      password,
      authResponse.password
    );

    if (!isMatch) {
      throw new ApiError(401, "Invalid password");
    }

    return await setAuthCookiesAndRespond(
      res,
      authResponse,
      "Login successful"
    );
  }
);

// ---------- REGISTER ----------
const register = asyncHandler(
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { userName, email, password } = req.body;

    const userExists = await authRepository.checkAuthExists({ email });

    if (userExists) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword: string = await hashPassword(password);

    const userId = new Types.ObjectId();

    const authResponse = await authRepository.createAuth({
      userName,
      email,
      password: hashedPassword,
      userId,
    });

    return await setAuthCookiesAndRespond(
      res,
      authResponse,
      "Registration successful"
    );
  }
);

export default {
  login,
  register,
};