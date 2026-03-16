import logger from "#configs/logger.js";
import redis from "#configs/redis.js";

const getCacheOrDefault = async (key, fetchFn, ttl = 3600) => {
  try {
    const cached = await redis.get(key);

    if (cached) {
      await redis.expire(key, ttl);
      return JSON.parse(cached);
    }

    const data = await fetchFn();

    await redis.set(key, JSON.stringify(data), "EX", ttl);

    return data;
  } catch (error) {
    logger.error("Redis cache error:", error);
    return fetchFn();
  }
};

export default getCacheOrDefault;
