const { NotFoundError } = require('../errors/notFoundError'); // 404
const { pageNotFoundMsg } = require('../utils/constants');

const notFound = (req, res, next) => {
  next(new NotFoundError(pageNotFoundMsg));
};

module.exports = { notFound };
