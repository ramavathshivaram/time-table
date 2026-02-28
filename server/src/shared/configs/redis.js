import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

redis.on("error", (err) => console.log("Redis Client Error", err));

redis.on("connect", () => console.log("Redis Client Connected."));

redis.on("end", () => console.log("Redis Client Disconnected."));

await redis.set("ping", "pong", "EX", 60 * 60 * 24);

console.log(await redis.get("ping"));

export default redis;
