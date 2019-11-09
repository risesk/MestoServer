const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователя с таким id не существует' });
      }
      return res.send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователя с таким id не существует' });
      }
      return res.send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователя с таким id не существует' });
      }
      return res.send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
