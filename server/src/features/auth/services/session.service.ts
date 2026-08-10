import crypto from "node:crypto";

import redis from "#configs/redis.js";
import { SESSION_TTL } from "#configs/constants.js";
import { errors } from "#utils/errors.js";

import { tokenService } from "./token.service.js";

interface SessionData {
  userId: string;
  refreshTokenHash: string;
}

interface CreateSessionResult {
  sessionId: string;
  refreshToken: string;
}

interface RotateSessionResult {
  userId: string;
  refreshToken: string;
}

const SESSION_PREFIX = "session";

const getSessionKey = (sessionId: string): string => {
  return `${SESSION_PREFIX}:${sessionId}`;
};

const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const create = async (userId: string): Promise<CreateSessionResult> => {
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

  return {
    sessionId,
    refreshToken,
  };
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
): Promise<SessionData> => {
  const session = await get(sessionId);

  if (!session) {
    throw errors.unauthorized("Session not found");
  }

  const storedHash = Buffer.from(session.refreshTokenHash, "hex");

  const providedHash = Buffer.from(hashToken(refreshToken), "hex");

  if (
    storedHash.length !== providedHash.length ||
    !crypto.timingSafeEqual(storedHash, providedHash)
  ) {
    throw errors.unauthorized("Invalid refresh token");
  }

  return session;
};

const rotate = async (refreshToken: string): Promise<RotateSessionResult> => {
  const [sessionId] = tokenService.getDataFromRefreshToken(refreshToken);

  if (!sessionId) {
    throw errors.unauthorized("Invalid refresh token");
  }

  const session = await validate(sessionId, refreshToken);

  const newRefreshToken = tokenService.generateRefreshToken(sessionId);

  session.refreshTokenHash = hashToken(newRefreshToken);

  await redis.set(
    getSessionKey(sessionId),
    JSON.stringify(session),
    "EX",
    SESSION_TTL,
  );

  return {
    userId: session.userId,
    refreshToken: newRefreshToken,
  };
};

const revoke = async (refreshToken: string): Promise<void> => {
  const [sessionId] = tokenService.getDataFromRefreshToken(refreshToken);

  if (!sessionId) {
    return;
  }

  await redis.del(getSessionKey(sessionId));
};

const generateForgotPasswordToken = async (userId: string): Promise<string> => {
  const token = tokenService.generatePasswordResetToken();

  const key = `forgot-password:${token}`;

  await redis.set(key, userId, "EX", 15 * 60);

  return token;
};

const getUserIdFromPasswordResetToken = async (
  token: string,
): Promise<string> => {
  const key = `forgot-password:${token}`;

  const userId = await redis.get(key);

  if (!userId) {
    throw errors.badRequest("Invalid or expired token");
  }

  // Make reset token single-use.
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
