import ApiError from "../lib/ApiError.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    throw new ApiError(427, "Unauthorized");
  }

  req.authId = decoded.authId;
  req.userId = decoded.userId;
  next();
};

export default authenticate;
