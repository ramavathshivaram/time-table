import ApiError from "../lib/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJwtToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decoded.userId;
  next();
};

export default verifyJwtToken;
