const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretkey } = require('../middlewares/auth');

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
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
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

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secretkey,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 3600,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
