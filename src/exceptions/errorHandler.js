function errorHandler(err, res) {
  console.error(err); // Log the error for debugging
  const statusCode = err.statusCode || 500;
  // Return the error response
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
      err,
    },
  });
}

module.exports = errorHandler;
