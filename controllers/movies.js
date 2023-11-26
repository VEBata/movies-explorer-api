const mongoose = require('mongoose');
const movieSchema = require('../models/movie');
const { BadRequestError } = require('../errors/badRequestError'); // 400
const { ForbiddenError } = require('../errors/forbiddenError'); // 403
const { NotFoundError } = require('../errors/notFoundError'); // 404
const {
  incorrectDataMovieMsg,
  impossibleDeleteSomeoneMovieMsg,
  movieNotFoundMsg,
  incorrectDataDeleteMovieMsg,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  movieSchema.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  movieSchema.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(incorrectDataMovieMsg));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  movieSchema.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenError(impossibleDeleteSomeoneMovieMsg));
        return;
      }
      movieSchema.deleteOne(movie)
        .orFail()
        .then(() => {
          res.status(200).send(movie);
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError(movieNotFoundMsg));
            return;
          }
          next(err);
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(movieNotFoundMsg));
        return;
      } if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(incorrectDataDeleteMovieMsg));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
