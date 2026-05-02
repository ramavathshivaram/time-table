import logger from "#configs/logger.js";

const notFoundRoute = (req, res, next) => {
  logger.warn({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    method: req.method,
    path: req.originalUrl,
  });

  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export default notFoundRoute;
