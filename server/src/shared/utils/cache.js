import logger from "#configs/logger.js";
import redis from "#configs/redis.js";

const readThroughCache = async (key, fetchFn, ttl = 3600) => {
  try {
    const cached = await redis.get(key);

    if (cached) {
      await redis.expire(key, ttl);
      return JSON.parse(cached);
    }

    const data = await fetchFn();

    if (data !== null && data !== undefined) {
      await redis.set(key, JSON.stringify(data), "EX", ttl);
    }

    return data;
  } catch (error) {
    logger.error("Redis readThrough error:", error);
    return fetchFn();
  }
};

const writeThroughCache = async (key, data, dbWriteFn, ttl = 3600) => {
  try {
    const savedData = await dbWriteFn(data);

    await redis.set(key, JSON.stringify(savedData), "EX", ttl);

    return savedData;
  } catch (error) {
    logger.error("Redis writeThrough error:", error);
    throw error;
  }
};

const writeBackCache = async (key, data, queueFn, ttl = 3600) => {
  try {
    await redis.set(key, JSON.stringify(data), "EX", ttl);

    await queueFn({
      type: "WRITE_BACK",
      key,
      data,
    });

    return data;
  } catch (error) {
    logger.error("Redis writeBack error:", error);
    throw error;
  }
};

export default {
  readThroughCache,
  writeThroughCache,
  writeBackCache,
};
