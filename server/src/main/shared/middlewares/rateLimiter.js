import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "#configs/redis.js";
import asyncHandler from "express-async-handler";
import ApiError from "#shared/utils/ApiError.js";

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 100, // requests
  duration: 60, // per minute
  blockDuration: 60,
});

const rateLimiterMiddleware = asyncHandler(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    return next(new ApiError(429, "Too many requests"));
  }
});

export default rateLimiterMiddleware;
