import Redis from "ioredis";
import logger from "#configs/logger.js";
import env from "#configs/env.js";

export const redis = new Redis({
  host: env.REDIS_HOST || "127.0.0.1",
  port: env.REDIS_PORT || 6379,

  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  retryStrategy: (times) => Math.min(times * 50, 2000)
});

redis.on("connect", () => {
  logger.info("Redis connected");
});

redis.on("ready", () => {
  logger.info("Redis ready");
});

redis.on("error", (err) => {
  logger.error("Redis error", err);
});

redis.on("end", () => {
  logger.warn("Redis connection closed");
});

export const checkRedis = async () => {
  try {
    const pong = await redis.ping();

    if (pong !== "PONG") {
      throw new Error("Invalid Redis ping response");
    }

    logger.info("Redis ping successful");
  } catch (err) {
    logger.error("Redis health check failed", err);
    throw err;
  }
};

export default redis;
