import ApiError from "#utils/ApiError.js";
import jwt from "jsonwebtoken";
import env from "#configs/env.js";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(403, "Access token missing or malformed"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError(403, "Access token missing"));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

    req.authId = decoded.authId;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return next(new ApiError(403, "Token expired"));
  }
};

export default authenticate;
