const errorHandler = (err, req, res, next) => {
  console.log(err);
  //if status code is 200 change to 500 else set as it is
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    error: err.message,
    status: "false",
  });
};

module.exports = { errorHandler };
