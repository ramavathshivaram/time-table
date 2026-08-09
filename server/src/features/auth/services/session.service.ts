import crypto from "node:crypto";

import redis from "#configs/redis.js";
import { SESSION_TTL } from "#configs/constants.js";
import ApiError from "#utils/ApiError.js";

import { tokenService } from "./token.service.js";

interface SessionData {
  userId: string;
  refreshTokenHash: string;
}

interface RotateSessionResult {
  refreshToken: string;
}

const SESSION_PREFIX = "session";

const getSessionKey = (sessionId: string): string => {
  return `${SESSION_PREFIX}:${sessionId}`;
};

const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const create = async (userId: string): Promise<string> => {
  const sessionId = crypto.randomUUID();

  const refreshToken = tokenService.generateRefreshToken(sessionId);

  const session: SessionData = {
    userId,
    refreshTokenHash: hashToken(refreshToken),
  };

  await redis.set(
    getSessionKey(sessionId),
    JSON.stringify(session),
    "EX",
    SESSION_TTL,
  );

  return refreshToken;
};

const get = async (sessionId: string): Promise<SessionData | null> => {
  const session = await redis.get(getSessionKey(sessionId));

  if (!session) {
    return null;
  }

  return JSON.parse(session) as SessionData;
};

const validate = async (
  sessionId: string,
  refreshToken: string,
): Promise<SessionData | null> => {
  const session = await get(sessionId);

  if (!session) {
    return null;
  }

  const tokenHash = hashToken(refreshToken);

  const storedHash = Buffer.from(session.refreshTokenHash, "hex");

  const providedHash = Buffer.from(tokenHash, "hex");

  if (
    storedHash.length !== providedHash.length ||
    !crypto.timingSafeEqual(storedHash, providedHash)
  ) {
    return null;
  }

  return session;
};

const rotate = async (
  sessionId: string,
  refreshToken: string,
): Promise<RotateSessionResult | null> => {
  const session = await validate(sessionId, refreshToken);

  if (!session) {
    return null;
  }

  const newRefreshToken = tokenService.generateRefreshToken(sessionId);

  session.refreshTokenHash = hashToken(newRefreshToken);

  const remainingSeconds = Math.max(
    1,
    Math.ceil((session.expiresAt - Date.now()) / 1000),
  );

  await redis.set(
    getSessionKey(sessionId),
    JSON.stringify(session),
    "EX",
    remainingSeconds,
  );

  return {
    refreshToken: newRefreshToken,
  };
};

const revoke = async (refreshToken: string): Promise<void> => {
  const [sessionId] = tokenService.getDataFromRefreshToken(refreshToken);
  await redis.del(getSessionKey(sessionId));
};

const generateForgotPasswordToken = async (userId: string): Promise<string> => {
  const token = tokenService.generatePasswordResetToken();

  const key = `forgot-password:${token}`;

  await redis.set(key, userId, {
    EX: 60 * 60,
  });

  return token;
};

const getUserIdFromPasswordResetToken = async (
  token: string,
): Promise<string> => {
  const key = `forgot-password:${token}`;

  const userId = await redis.get(key);

  if (!userId) {
    throw new ApiError(400, "Invalid or expired token");
  }

  await redis.del(key);
  return userId;
};

export const sessionService = {
  create,
  get,
  validate,
  rotate,
  revoke,

  generateForgotPasswordToken,
  getUserIdFromPasswordResetToken,
};
