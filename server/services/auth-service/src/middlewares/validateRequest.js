const validateRequest = (scheme) => {
  return (req, res, next) => {
    const result = scheme.parse(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }
    next();
  };
};

export default validateRequest;
