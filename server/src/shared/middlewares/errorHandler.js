import logger from "#configs/logger.js";

const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Something went wrong";

  logger.error({
    status,
    message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    success: false,
    message,
  });
};

export default errorHandler;
