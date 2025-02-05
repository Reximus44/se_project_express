const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const ClothingItem = require("../models/clothingItem");

const { SUCCESS } = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(SUCCESS).send(items))
    .catch((err) => next(err));
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        // return res
        //   .status(FORBIDDEN)
        //   .send({ message: "Can't delete other users cards" });
        throw new ForbiddenError("Can't delete other users cards");
      }

      return ClothingItem.deleteOne(item).then(() => {
        res
          .status(SUCCESS)
          .send({ message: "item successfully deleted", item });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        // return res.status(BAD_REQUEST).send({ message: err.message });
        return next(new BadRequestError(err.message));
      }
      if (err.name === "DocumentNotFoundError") {
        // return res.status(NOT_FOUND).send({ message: err.message });
        return next(new NotFoundError(err.message));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        // return res.status(BAD_REQUEST).send({ message: err.message });
        return next(new BadRequestError(err.message));
      }
      if (err.name === "DocumentNotFoundError") {
        // return res.status(NOT_FOUND).send({ message: err.message });
        return next(new NotFoundError(err.message));
      }
      return next(err);
    });
};

const deleteLikeItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )

    .orFail()
    .then((item) => res.status(SUCCESS).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        // return res.status(BAD_REQUEST).send({ message: err.message });
        return next(new BadRequestError(err.message));
      }
      if (err.name === "DocumentNotFoundError") {
        // return res.status(NOT_FOUND).send({ message: err.message });
        return next(new NotFoundError(err.message));
      }
      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  deleteLikeItem,
};
