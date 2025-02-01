const errorHandler = ((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || "An error has occurred on the server";
   console.log(statusCode, message);
   res.status(statusCode).send({ message });
  });

  module.exports = errorHandler;
  