import redis from "#configs/redis.js";

const writeThroughCache = async (key, data, saveFn, ttl = 3600) => {

  const result = await saveFn(data);

  await redis.set(key, JSON.stringify(result), "EX", ttl);

  return result;
};

export default writeThroughCache;
