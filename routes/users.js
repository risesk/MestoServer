const users = require('../data/users.json');

const getUsers = (req, res) => {
  res.send(users);
};

const getUser = (req, res) => {
  users.forEach((user) => {
    // eslint-disable-next-line no-underscore-dangle
    if (req.params.id === user._id) {
      res.send(user);
      // eslint-disable-next-line no-useless-return
      return;
    }
  });
  res.status(404);
  res.send({ message: 'Нет пользователя с таким id' });
};

module.exports = { getUsers, getUser };
