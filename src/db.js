const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    const options = {
      // Используем обновленный парсер строки URL драйвера Mongo
      useNewUrlParser: true,
      // Используем новый механизм обнаружения и мониторинга серверов
      useUnifiedTopology: true
    };
    mongoose.set('strictQuery', false);
    // Подключение к БД
    mongoose.connect(DB_HOST, options);
    // Выводим ошибку при неуспешном подключении
    mongoose.connection.on('error', err => {
      console.error(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  }
};
