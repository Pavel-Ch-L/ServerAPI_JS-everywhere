require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers');
const models = require('./models');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const app = express();
app.use(helmet());
app.use(cors());
const port = process.env.PORT || 4000;
const typeDefs = require('./schema');
const DB_HOST = process.env.DB_HOST;

// Получаем информацию пользователя из jwt
const getUser = token => {
  if (token) {
    try {
      // Возвращаем информацию пользователя из токена
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Если с токеном возникли проблемы выбросить ошибку
      throw new Error('Session invalid');
    }
  }
};

// Настройка Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: async ({ req }) => {
    // Получаем токен пользователя из заголовка
    const token = req.headers.authorization;
    // Пытаемся извлеч пользователя с помощю токена
    const user = await getUser(token);
    // Вывод информации о пользователе в консоль
    console.log(user);
    // Добавление моделей БД и информации о пользователе в контекст
    // (будут доступны каждой функции распознавания)
    return { models, user };
  }
});

// Применяем промежуточное ПО Apollo Graph QL и указываем путь к /api
server.applyMiddleware({ app, path: '/api' });

(function start() {
  // Подключаем БД
  db.connect(DB_HOST);
  mongoose.connection.once('open', () => {
    // Запускаем сервер
    console.log('Mongo connection is open...');
    app.listen({ port }, () => {
      console.log(
        `Graph QL server running at http://localhost:${port}${server.graphqlPath}`
      );
    });
  });
})();
