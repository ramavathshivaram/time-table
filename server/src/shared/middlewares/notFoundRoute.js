const notFoundRoute = (req, res) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
  });
};

export default notFoundRoute;
