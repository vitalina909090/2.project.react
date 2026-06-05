// middleware/auth.js
// Middleware не змінився — JWT не залежить від типу БД

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret'; // У реальному проєкті — з .env

const auth = (req, res, next) => {
    try {
        // Отримуємо токен з заголовка: "Bearer TOKEN"
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            // Перевіряємо і декодуємо токен
            const decoded = jwt.verify(token, JWT_SECRET);

            // Зберігаємо дані користувача в req для наступних обробників
            req.user = decoded;

            next();
        }
    } catch (error) {
        return res.status(400).json({
            error: { message: 'Invalid token' }
        });
    }
};

module.exports = auth;
