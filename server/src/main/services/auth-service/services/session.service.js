import redis from "#configs/redis.js";
const SESSION_TTL = 60 * 60 * 24;

const getSessionKey = (authId) => `session:${authId}`;

export const createSession = async (authId, tokenVersion) => {
  return redis.set(
    getSessionKey(authId),
    JSON.stringify({ tokenVersion }),
    "EX",
    SESSION_TTL,
  );
};

export const getSession = async (authId) => {
  const session = await redis.get(getSessionKey(authId));
  return session ? JSON.parse(session) : null;
};

export const deleteSession = async (authId) => {
  return redis.del(getSessionKey(authId));
};

export const updateSession = async (authId, tokenVersion) => {
  return redis.set(
    getSessionKey(authId),
    JSON.stringify({ tokenVersion }),
    "EX",
    SESSION_TTL,
  );
};

export const rotateSession = async (authId, tokenVersion) => {
  await deleteSession(authId);
  return createSession(authId, tokenVersion);
};
