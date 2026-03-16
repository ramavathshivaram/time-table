import ApiError from "#utils/ApiError.js";
import jwt from "jsonwebtoken";
const { sign, verify, decode } = jwt;
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../lib/const.js";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateTokens = (userId, authId, tokenVersion) => {
  const payload = { userId, authId, tokenVersion };

  const accessToken = sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export const generateAccessToken = (userId, authId, tokenVersion) => {
  return sign({ userId, authId, tokenVersion }, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (userId, authId, tokenVersion) => {
  return sign({ userId, authId, tokenVersion }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const decodeTokenPayload = (token) => {
  if (!token) throw new ApiError(404, "Token not found");
  return decode(token);
};

export const verifyToken = (token, isAccessToken = true) => {
  if (!token) throw new ApiError(404, "Token not found");
  return verify(token, isAccessToken ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET);
};
