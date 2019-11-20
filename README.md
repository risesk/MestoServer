# MestoServer
[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/risesk/MestoServer?label=version)]

#### Возможности API
1. GET-запрос ```localhost:3000/users``` возвращает JSON-список всех пользователей;
2. GET-запрос ```localhost:3000/cards``` возвращает JSON-список всех карточек;
3. GET-запрос ```localhost:3000/users/8340d0ec33270a25f2413b69``` возвращает JSON-пользователя с указанным идентификатором
4. Запрос на несуществующий адрес вовзращает код ошибки.
5. POST-запрос на адрес ```localhost:3000/users``` создаст в БД пользователя;
6. POST-запрос на адрес ```localhost:3000/cards``` создаст в БД карточку;
7. PATCH-запрос на адрес ```localhost:3000/users/me``` обновляет информацию о пользователе;
8. PATCH-запрос на адрес ```localhost:3000/users/me/avatar``` обновляет аватар пользователя в БД;
9. PUT-запрос на адрес вида ```localhost:3000/cards/5db360fd9e2af10364acfa45/likes``` добавляет карточке лайк от пользователя в БД;
10. DELETE-запрос на адрес вида ```localhost:3000/cards/5db360fd9e2af10364acfa4333/likes``` удаляет лайк от пользователя из карточки в БД;

#### Установка
1. Скачать репозиторий:
```git clone git@github.com:risesk/mesto.git```
2. Установить npm-зависимости:
```npm i```
3. Запустить проект на локальном сервере:
```npm run start```
