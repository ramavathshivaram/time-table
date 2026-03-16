import ApiError from "#utils/ApiError.js";
import jwt from "jsonwebtoken";
import env from "#configs/env.js";

const authenticate = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new ApiError(401, "Access token missing"));
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
