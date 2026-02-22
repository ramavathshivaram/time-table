const errorHandler = (err, req, res, next) => {
  console.log(err);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    message,
    success: false,
  });
};

export default errorHandler;
