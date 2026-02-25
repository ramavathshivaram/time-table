const errorHandler = (err, req, res, next) => {
  console.error("Gateway Error:", err);
  res.status(500).json({ message: "Gateway Error" });
};

export default errorHandler
