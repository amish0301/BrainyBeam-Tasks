class ApiError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message); // calling parent class constructor
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

export default ApiError;
