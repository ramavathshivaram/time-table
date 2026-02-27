const notFoundRoute = (req, res) => {
  console.log("Route not found");
  res.status(404).json({
    message: "Route not found",
    success: false,
  });
};

export default notFoundRoute;
