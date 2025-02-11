export const ErrorHandler = (err, req, res, next) => {
  err.message ||= "Something went wrong";
  err.statusCode ||= 500;

  // Duplicate key error
  if (err.code === 11000) {
    const error = Object.keys(err.keyPattern).join(",");
    err.message = `Duplicate Field - ${error}`;
    err.status = 400;
  }

  // Cast error
  if (err.name === "CastError") {
    const path = err.path;
    err.message = `Invalid Format of ${path}`;
    err.status = 400;
  }

  const response = {
    success: false,
    message: err.message,
  }

  return res.status(err.statusCode).json(response);
};
