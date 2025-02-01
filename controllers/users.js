const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const { SUCCESS, CREATED } = require("../utils/errors");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res
        .status(CREATED)
        .send({ name: user.name, email: user.email, avatar: user.avatar })
    )
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        // return res.status(BAD_REQUEST).send({ message: err.message });
        console.log("asdfasds");
        return next(new BadRequestError(err.message));
      }
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        // return res.status(NOT_FOUND).send({ message: err.message });
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        // return res.status(BAD_REQUEST).send({ message: err.message });
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        // return res.status(UNAUTHORIZED).send({ message: err.message });
        return next(new UnauthorizedError(err.message));
      }
      if (err.message === "Password incorrect") {
        // return res.status(UNAUTHORIZED).send({ message: err.message });
        return next(new UnauthorizedError(err.message));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { runValidators: true, new: true }
  )
    .orFail()
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        // return res.status(NOT_FOUND).send({ message: err.message });
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        // return res.status(BAD_REQUEST).send({ message: err.message });
        return next(new BadRequestError(err.message));
      }
      if (err.name === "ValidationError") {
        // return res.status(BAD_REQUEST).send({ message: err.message });
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports = { createUser, getCurrentUser, signin, updateUser };
