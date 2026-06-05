// db/db.js
// Sequelize — ORM, який підтримує SQLite, PostgreSQL, MySQL та інші бази
// Для переходу на іншу БД достатньо змінити dialect і параметри підключення

const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',                                  // тип бази даних
    storage: path.join(__dirname, '../database.db'),    // шлях до файлу БД
    logging: false,                                     // вимкнути SQL-логи в консолі
});

module.exports = sequelize;
