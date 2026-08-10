import type { NextFunction, Request, Response } from "express";
import { tokenService } from "#features/auth/services/token.service.js";
import { errors } from "#utils/errors.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errors.forbidden());
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(errors.forbidden());
  }

  console.log(token);

  try {
    const payload = tokenService.verifyAccessToken(token);
    req.userId = payload.sub;

    console.log(payload);
    console.log(req.userId);
    next();
  } catch (error) {
    return next(errors.forbidden());
  }
};
