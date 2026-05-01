import ApiError from "#utils/ApiError.js";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../lib/const.js";
import env from "#configs/env.js";

export const generateTokens = (userId, authId, tokenVersion) => {
  return {
    accessToken: generateAccessToken(userId, authId, tokenVersion),
    refreshToken: generateRefreshToken(userId, authId, tokenVersion),
  };
};

export const generateAccessToken = (userId, authId, tokenVersion) => {
  return sign({ userId, authId, tokenVersion }, env.JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (userId, authId, tokenVersion) => {
  return sign({ userId, authId, tokenVersion }, env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyToken = (token, expectedType = "access") => {
  if (!token) throw new ApiError(404, "Token not found");
  return verify(
    token,
    expectedType === "access" ? env.JWT_ACCESS_SECRET : env.JWT_REFRESH_SECRET,
  );
};
