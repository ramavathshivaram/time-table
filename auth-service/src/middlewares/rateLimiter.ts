import { RateLimiterRedis } from "rate-limiter-flexible";
import asyncHandler from "express-async-handler";
import redis from "#configs/redis.js";
import ApiError from "#utils/ApiError.js";
import type { NextFunction, Request, Response } from "express";

export const authLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 10,
  duration: 60,
  blockDuration: 100,
  execEvenly: true,
});

export const otpLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 5,
  duration: 300,
  blockDuration: 300,
  execEvenly: true,
});

export const refreshLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 20,
  duration: 60,
  blockDuration: 60,
  execEvenly: true,
});

export const authCheckLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 60,
  duration: 60,
  blockDuration: 30,
  execEvenly: true,
});

export const rateLimiterMiddleware = (limiter: RateLimiterRedis) =>
  asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    try {
      const key = req.cookies?.refreshToken || req.ip;

      await limiter.consume(key);
      next();
    } catch {
      return next(new ApiError(429, "Too many requests"));
    }
  });

export default rateLimiterMiddleware;
