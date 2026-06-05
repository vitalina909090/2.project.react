// models/Article.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Article = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true, // createdAt, updatedAt
});

module.exports = Article;
