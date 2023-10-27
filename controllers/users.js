const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { BadRequestError } = require('../errors/badRequestError'); // 400
const { NotFoundError } = require('../errors/notFoundError'); // 404
const { ConflictError } = require('../errors/conflictError'); // 409

const { NODE_ENV, SECRET_KEY } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');
const {
  incorrectDataUserMsg,
  userNotFoundMsg,
  userAlreadyExistsMsg,
} = require('../utils/constants');

const getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      }
    })
    .catch(next);
};

const updateUserById = (req, res, next) => {
  const { name, email } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(new BadRequestError(incorrectDataUserMsg));
      if (err instanceof mongoose.Error.ValidationError) {
        return;
      } if (err.code === 11000) {
        next(new ConflictError(userAlreadyExistsMsg));
        return;
      } if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(userNotFoundMsg));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(incorrectDataUserMsg));
        return;
      } if (err.code === 11000) {
        next(new ConflictError(userAlreadyExistsMsg));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      const token = jwt.sign(payload, NODE_ENV === MODE_PRODUCTION ? SECRET_KEY : DEV_KEY, {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch((err) => next(err));
};

module.exports = {
  getCurrentUser,
  updateUserById,
  createUser,
  login,
};
