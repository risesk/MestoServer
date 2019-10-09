const router = require('express').Router();
const { getUsers, getUser } = require('./users');
const { getCards } = require('./cards');
const { wrongPage } = require('./wrongpage');

router.get('/users', getUsers);
router.get('/cards', getCards);
router.get('/users/:id', getUser);
router.get('*', wrongPage);

module.exports = router;
