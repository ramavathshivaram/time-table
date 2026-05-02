import ApiError from "#utils/ApiError.js";
import jwt, { type JwtPayload, type PrivateKey } from "jsonwebtoken";
import env from "#configs/env.js";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "#utils/const.js";
import type { Types } from "mongoose";

const { sign, verify } = jwt;

const privateKey = env.JWT_PRIVATE_KEY.replace(/\\n/g, "\n") as PrivateKey;

// ---------- TYPES ----------
interface TokenPayload extends JwtPayload {
  userId: Types.ObjectId;
  authId: Types.ObjectId;
  tokenVersion: number;
  type: "access" | "refresh";
}

export const generateTokens = (
  userId: Types.ObjectId,
  authId: Types.ObjectId,
  tokenVersion: number,
) => {
  return {
    accessToken: generateAccessToken(userId, authId, tokenVersion),
    refreshToken: generateRefreshToken(userId, authId, tokenVersion),
  };
};

export const generateAccessToken = (
  userId: Types.ObjectId,
  authId: Types.ObjectId,
  tokenVersion: number,
): string => {
  return sign({ userId, authId, tokenVersion, type: "access" }, privateKey, {
    algorithm: "RS256",
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (
  userId: Types.ObjectId,
  authId: Types.ObjectId,
  tokenVersion: number,
): string => {
  return sign(
    { userId, authId, tokenVersion, type: "refresh" },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );
};

// ---------- VERIFY ----------
export const verifyToken = (token: string): TokenPayload => {
  if (!token) throw new ApiError(401, "Token not found");

  try {
    const decoded = verify(token, env.JWT_REFRESH_SECRET);

    if (typeof decoded === "string") {
      throw new ApiError(401, "Invalid token");
    }

    return decoded as TokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};
