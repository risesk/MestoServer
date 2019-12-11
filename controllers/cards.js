/* eslint-disable no-else-return */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      } else if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Недостаточно прав');
      } else {
        return Card.findByIdAndRemove(cardId)
          .then((cardForDelete) => {
            res.send(cardForDelete);
          });
      }
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    { runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      return res.send(card);
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
    { runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
