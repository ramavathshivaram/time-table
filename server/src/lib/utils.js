import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from "./const.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateTokens = (userId, tokenVersion) => {
  const accessToken = jwt.sign(
    { userId, tokenVersion },
    process.env.JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );

  const refreshToken = jwt.sign(
    { userId, tokenVersion },
    process.env.JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );

  return { accessToken, refreshToken };
};

export const generateAccessToken = (userId, tokenVersion) => {
  const accessToken = jwt.sign(
    { userId, tokenVersion },
    process.env.JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );

  return accessToken;
};

export const generateRefreshToken = (userId, tokenVersion) => {
  const refreshToken = jwt.sign(
    { userId, tokenVersion },
    process.env.JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );

  return refreshToken;
};

export const getTokenDataSafe = (token) => {
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

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const isPasswordMatched = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
