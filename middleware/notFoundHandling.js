const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    error: {
      message: "Resource not found",
    },
  });
};

module.exports = notFoundHandler;
