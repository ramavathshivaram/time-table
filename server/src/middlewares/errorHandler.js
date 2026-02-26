const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    message,
    success: false,
  });
};

export default errorHandler;
