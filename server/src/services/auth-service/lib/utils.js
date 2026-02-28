import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from "./const.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateTokens = (authId, tokenVersion) => {
  const accessToken = jwt.sign(
    { authId, tokenVersion },
    process.env.JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );

  const refreshToken = jwt.sign(
    { authId, tokenVersion },
    process.env.JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );

  return { accessToken, refreshToken };
};

export const generateAccessToken = (authId, tokenVersion) => {
  const accessToken = jwt.sign(
    { authId, tokenVersion },
    process.env.JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );

  return accessToken;
};

export const generateRefreshToken = (authId, tokenVersion) => {
  const refreshToken = jwt.sign(
    { authId, tokenVersion },
    process.env.JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );

  return refreshToken;
};

export const decodeTokenPayload = (token) => {
  if (!token) return null;

  try {
    return jwt.decode(token);
  } catch (error) {
    console.error("JWT verify error:", error.message);
    return null;
  }
};

export const verifyToken = (token) => {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT verify error:", error.message);
    return null;
  }
};

export const hashPassword = async (password) => await bcrypt.hash(password, 10);

export const isPasswordMatched = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);
