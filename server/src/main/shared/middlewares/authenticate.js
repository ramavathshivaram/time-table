import ApiError from "#utils/ApiError.js";
import jwt from "jsonwebtoken";
import env from "#configs/env.js";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(427, "Access token missing or malformed"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError(427, "Access token missing"));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

    req.authId = decoded.authId;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(427, "Token expired"));
    }

    return next(new ApiError(401, "Invalid token"));
  }
};

export default authenticate;
