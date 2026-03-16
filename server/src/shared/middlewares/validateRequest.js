import ApiError from "#utils/ApiError.js";

const validateRequest = (scheme) => {
  return (req, res, next) => {
    const result = scheme.parse(req.body);
    if (result.error) {
      throw new ApiError(400, result.error.details[0].message);
    }
    next();
  };
};

export default validateRequest;
