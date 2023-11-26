const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');
const { authRequiredMsg } = require('../utils/constants');

const { UnauthorizedError } = require('../errors/unauthorizedError'); // 401

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(authRequiredMsg));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === MODE_PRODUCTION ? SECRET_KEY : DEV_KEY);
  } catch (err) {
    return next(new UnauthorizedError(authRequiredMsg));
  }

  req.user = payload;

  return next();
};
