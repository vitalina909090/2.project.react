// index.js
const express = require('express');
const sequelize = require('./db/db');

// Імпортуємо моделі — щоб Sequelize про них знав перед sync()
require('./models/User');
require('./models/Article');
require('./models/Product');
const cors = require('cors');

const ArticleRoutes = require('./router/ArticleRoutes');
const ProductRoutes = require('./router/ProductRoutes');
const AuthRoutes = require('./router/AuthRoutes');
const { savePushToken } = require('./controllers/AuthController');
const auth = require('./middleware/auth');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use('/api', ArticleRoutes);
app.use('/api', ProductRoutes);
app.use('/api', AuthRoutes);
app.post('/api/save-push-token', auth, savePushToken);

// Головна сторінка — список усіх маршрутів
// В Express 5 внутрішній роутер доступний через app.router (без _)
app.get('/', (req, res) => {
    const routes = [];

    const stack = app.router?.stack ?? [];

    stack.forEach((middleware) => {
        if (middleware.route) {
            // Прямий маршрут (наприклад, app.get('/'))
            const { path, methods } = middleware.route;
            const method = Object.keys(methods)[0].toUpperCase();
            routes.push({ method, path });

        } else if (middleware.handle?.stack) {
            // Router-middleware (app.use('/api', SomeRouter))
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    const { path, methods } = handler.route;
                    const method = Object.keys(methods)[0].toUpperCase();
                    // Отримуємо prefix з regexp: /^\/api\/?(?=\/|$)/i -> '/api'
                    const prefix = (middleware.regexp?.source ?? '')
                        .replace(/^\^\\\//, '/')
                        .replace(/\\\/\?\(\?=\\\/\|\$\).*/, '')
                        .replace(/\\\//g, '/');
                    routes.push({ method, path: prefix + path });
                }
            });
        }
    });

    res.json({ routes });
});

// sequelize.sync() — створює таблиці автоматично на основі моделей
// { alter: true } — оновлює структуру таблиць якщо моделі змінились
sequelize.sync({ alter: true })
    .then(() => {
        console.log('SQLite connected ✅  →  database.db');
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });