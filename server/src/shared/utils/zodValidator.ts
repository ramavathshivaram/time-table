import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodType } from "zod";

import ApiError from "./ApiError.js";

export const zodValidator = <T>(schema: ZodType<T>): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Validation failed";

      throw new ApiError(400, message);
    }

    req.body = result.data;

    next();
  };
};
