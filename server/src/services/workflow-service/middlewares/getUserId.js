import ApiError from "../../../shared/lib/ApiError.js";

const getUserId = (req, res, next) => {
  const userId = req.cookies.userId;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  req.userId = userId;
  next();
};

export default getUserId;
