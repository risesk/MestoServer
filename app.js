const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { wrongPage } = require('./routes/wrongpage');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', wrongPage);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен, приложение слушает порт: ${PORT}`);
});
