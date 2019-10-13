const cards = require('../data/cards.json');

const getCards = (req, res) => {
  res.send(cards);
};

module.exports = { getCards };
