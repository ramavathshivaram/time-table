import Redis from "ioredis";
import logger from "./logger.js";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

redis.on("error", (err) => logger.info("Redis Client Error", err));

redis.on("connect", () => logger.info("Redis Client Connected."));

redis.on("end", () => logger.info("Redis Client Disconnected."));

await redis.set("ping", "pong", "EX", 60 * 60 * 24);

const pong = await redis.get("ping");

if (pong !== "pong") {
  logger.error("Redis ping failed");
}

export default redis;
