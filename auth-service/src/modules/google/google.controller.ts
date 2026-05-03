import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import axios from "axios";
import ApiError from "#utils/ApiError.js";
import authRepository from "#repositories/auth.repository.js";
import { generateRandomPassword } from "#services/password.service.js";
import setAuthCookiesAndRespond from "#services/setAuthCookiesAndRespond.service.js";
import { Types } from "mongoose";
import { createUserGrpc } from "#utils/api.js";

// ---------- TYPES ----------
interface GoogleLoginBody {
  accessToken: string;
}

interface GoogleUser {
  email: string;
  name: string;
  sub: string;
  picture: string;
}

// ---------- LOGIN ----------
const login = asyncHandler(
  async (req: Request<{}, {}, GoogleLoginBody>, res: Response) => {
    const { accessToken } = req.body;

    if (!accessToken) {
      throw new ApiError(401, "Unauthorized");
    }

    const googleUserData = await getUserDataFromGoogle(accessToken);

    if (!googleUserData?.email) {
      throw new ApiError(400, "Google email not found");
    }

    const authResponse = await authRepository.getUserByEmail(
      googleUserData.email,
    );

    if (!authResponse) {
      throw new ApiError(404, "User not found");
    }

    return await setAuthCookiesAndRespond(
      res,
      authResponse,
      "Login successful",
    );
  },
);

// ---------- REGISTER ----------
const register = asyncHandler(
  async (req: Request<{}, {}, GoogleLoginBody>, res: Response) => {
    const { accessToken } = req.body;

    if (!accessToken) {
      throw new ApiError(401, "Unauthorized");
    }

    const googleUserData = await getUserDataFromGoogle(accessToken);

    if (!googleUserData?.email) {
      throw new ApiError(400, "Google email not found");
    }

    const authResponse = await authRepository.checkAuthExists({
      email: googleUserData.email,
    });

    if (authResponse) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await generateRandomPassword();

    const userId = await createUserGrpc({
      userName: googleUserData.name,
      email: googleUserData.email,
      avatar: googleUserData,
    });

    const newAuthResponse = await authRepository.createAuth({
      email: googleUserData.email,
      password: hashedPassword,
      userId,
    });

    return await setAuthCookiesAndRespond(
      res,
      newAuthResponse,
      "Registration successful",
    );
  },
);

// ---------- GOOGLE FETCH ----------
const getUserDataFromGoogle = async (
  accessToken: string,
): Promise<GoogleUser> => {
  try {
    const response = await axios.get<GoogleUser>(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch {
    throw new ApiError(401, "Invalid Google token");
  }
};

export default {
  login,
  register,
};
