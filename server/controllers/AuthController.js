// controllers/AuthController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret'; // У реальному проєкті — з .env


// =====================
// РЕЄСТРАЦІЯ КОРИСТУВАЧА
// =====================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Sequelize: findOne({ where: { email } }) — аналог Mongoose findOne({ email })
        const candidate = await User.findOne({ where: { email: email.toLowerCase() } });

        if (candidate) {
            return res.status(400).json({
                error: { message: 'User already exists' }
            });
        }

        // User.create() запускає beforeSave-хук → пароль хешується автоматично
        await User.create({ name, email: email.toLowerCase(), password });

        res.status(201).json({ message: 'User created' });

    } catch (error) {
        return res.status(400).json({
            error: { message: 'Registration error' }
        });
    }
};


// ====================
// ЛОГІН КОРИСТУВАЧА
// ====================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email.toLowerCase() } });

        if (!user) {
            return res.status(400).json({
                error: { message: 'User not found!' }
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({
                error: { message: 'Invalid password' }
            });
        }

        // user.id — число (як у SQLite), а не рядок (як у MongoDB _id)
        const token = jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        return res.status(500).json({
            error: { message: 'Login error' }
        });
    }
};


// =================================
// ОТРИМАННЯ АВТОРИЗОВАНОГО КОРИСТУВАЧА
// =================================
const getAuthUser = async (req, res) => {
    try {
        // Sequelize: findByPk() — аналог Mongoose findById()
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: { message: 'User not found' }
            });
        }

        res.status(200).json({
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        return res.status(500).json({
            error: { message: 'Get user error' }
        });
    }
};


// ========================
// ЗБЕРЕЖЕННЯ PUSH-ТОКЕНА
// ========================
const savePushToken = async (req, res) => {
    const { token, userId } = req.body;
    // Sequelize: update({ field }, { where: { id } }) — аналог Mongoose findByIdAndUpdate()
    await User.update({ expoPushToken: token }, { where: { id: userId } });
    res.json({ success: true });
};


module.exports = { register, login, getAuthUser, savePushToken };
