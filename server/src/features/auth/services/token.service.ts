import crypto from "node:crypto";
import jwt from "jsonwebtoken";

import env from "#configs/env.js";
import { ACCESS_TOKEN_EXPIRES_IN } from "#configs/constants.js";

export interface AccessTokenPayload {
  sub: string;
}

const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    {
      sub: userId,
    } satisfies AccessTokenPayload,
    env.JWT_SECRET_KEY,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );
};

const generateRefreshToken = (sessionId: string): string => {
  const secret = crypto.randomBytes(32).toString("base64url");

  return `${sessionId}.${secret}`;
};

export const tokenService = {
  generateAccessToken,
  generateRefreshToken,
};
