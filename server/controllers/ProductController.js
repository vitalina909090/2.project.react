// controllers/ProductController.js

const Product = require('../models/Product');
const User = require('../models/User');
const sendPushNotification = require('../utils/sendPush');
const { Op } = require('sequelize');


// GET /api/products
const all = async (req, res) => {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ data: products });
};


// GET /api/products/:id
const getById = async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        return res.status(404).json({
            error: { message: 'Product not Found' }
        });
    }

    res.status(200).json({ data: product });
};


// POST /api/products
const create = async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        const savedProduct = await Product.create({ title, description, price, image });

        // Знайти всіх користувачів із push-токеном
        // Op.ne — оператор "не рівно" (not equal), аналог MongoDB { $exists: true }
        const users = await User.findAll({
            where: { expoPushToken: { [Op.ne]: null } }
        });

        for (const user of users) {
            await sendPushNotification({
                token: user.expoPushToken,
                title: '🆕 Новий товар',
                body: `Товар "${savedProduct.title}" додано`,
                data: { productId: savedProduct.id },
            });
        }

        res.status(201).json({ data: savedProduct });

    } catch (error) {
        return res.status(400).json({
            error: { message: error.message }
        });
    }
};


// PUT /api/products/:id
const update = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: { message: 'Product Not Found' }
            });
        }

        await product.update(req.body);
        res.status(200).json({ data: product });

    } catch (error) {
        return res.status(400).json({
            error: { message: error.message }
        });
    }
};


// DELETE /api/products/:id
const remove = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: { message: 'Product Not Found' }
            });
        }

        await product.destroy();
        res.status(204).send();

    } catch (error) {
        return res.status(400).json({
            error: { message: error.message }
        });
    }
};


module.exports = { all, getById, create, update, remove };
