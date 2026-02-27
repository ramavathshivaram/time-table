import ApiError from "../../services/auth-service/lib/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJwtToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(427, "Unauthorized");
  }

  req.userId = decoded.userId;
  next();
};

export default verifyJwtToken;
