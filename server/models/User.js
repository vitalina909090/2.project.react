// models/User.js
// Sequelize-модель дуже схожа на Mongoose-схему:
//   Mongoose:   new Schema({ field: { type, required } })
//   Sequelize:  { field: { type: DataTypes.X, allowNull } }

const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    // id генерується автоматично (INTEGER PRIMARY KEY AUTOINCREMENT)
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expoPushToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    // Sequelize автоматично додає поля createdAt і updatedAt
    timestamps: true,
});

// Хук перед збереженням — аналог Mongoose pre('save')
// Автоматично хешує пароль, якщо він змінився
User.beforeSave(async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

module.exports = User;
