const { serverErrorMsg } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? `${serverErrorMsg} ${err}` : message,
  });
  next();
};
