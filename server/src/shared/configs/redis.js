import Redis from "ioredis";

console.log("Redis host:", process.env.REDIS_HOST);

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

redis.on("error", (err) => console.log("Redis Client Error", err));

redis.on("connect", () => console.log("Redis Client Connected."));

redis.on("end", () => console.log("Redis Client Disconnected."));

await redis.set("ping", "pong", "EX", 60 * 60 * 24);

console.log(await redis.get("ping"));

export default redis;
