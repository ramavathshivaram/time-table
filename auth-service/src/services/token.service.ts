import ApiError from "#utils/ApiError.js";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import env from "#configs/env.js";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "#utils/const.js";
import type { Types } from "mongoose";

const { sign, verify } = jwt;

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
    accessToken: generateAccessToken(userId, tokenVersion),
    refreshToken: generateRefreshToken(userId, authId, tokenVersion),
  };
};

export const generateAccessToken = (
  userId: Types.ObjectId,
  tokenVersion: number,
): string => {
  const options: SignOptions = {
    algorithm: "RS256",
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };

  return sign(
    {
      userId,
      tokenVersion,
      type: "access",
    },
    env.JWT_PRIVATE_KEY as string,
    options,
  );
};

export const generateRefreshToken = (
  userId: Types.ObjectId,
  authId: Types.ObjectId,
  tokenVersion: number,
): string => {
  const options: SignOptions = {
    algorithm: "RS256",
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  };

  return sign(
    {
      userId,
      authId,
      tokenVersion,
      type: "refresh",
    },
    env.JWT_PRIVATE_KEY as string,
    options,
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  if (!token) throw new ApiError(401, "Token not found");

  try {
    const decoded = verify(token, env.JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    if (typeof decoded === "string" || decoded.type !== "access") {
      throw new ApiError(401, "Invalid token");
    }

    return decoded as TokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};

// ---------- VERIFY REFRESH TOKEN ----------
export const verifyRefreshToken = (token: string): TokenPayload => {
  if (!token) throw new ApiError(401, "Token not found");

  try {
    const decoded = verify(token, env.JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    if (typeof decoded === "string" || decoded.type !== "refresh") {
      throw new ApiError(401, "Invalid token");
    }

    return decoded as TokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};
