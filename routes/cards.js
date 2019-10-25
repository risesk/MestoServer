const cardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', addLike);
cardRouter.delete('/:cardId/likes', deleteLike);

module.exports =  cardRouter;

