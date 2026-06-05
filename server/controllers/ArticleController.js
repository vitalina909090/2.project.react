// controllers/ArticleController.js

const Article = require('../models/Article');


// GET /api/articles
const all = async (req, res) => {
    // findAll() — аналог Mongoose find({})
    const articles = await Article.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ data: articles });
};


// GET /api/articles/:id
const getById = async (req, res) => {
    // findByPk() — аналог Mongoose findById()
    const article = await Article.findByPk(req.params.id);

    if (!article) {
        return res.status(404).json({
            error: { message: 'Article not Found' }
        });
    }

    res.status(200).json({ data: article });
};


// POST /api/articles
const create = async (req, res) => {
    try {
        const { title, content } = req.body;
        // create() — аналог: new Article(data) + article.save()
        const article = await Article.create({ title, content });
        res.status(201).json({ data: article });

    } catch (error) {
        return res.status(400).json({
            error: { message: error.message }
        });
    }
};


// PUT /api/articles/:id
const update = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({
                error: { message: 'Article Not Found' }
            });
        }

        // update() на екземплярі — оновлює і повертає оновлений об'єкт
        await article.update(req.body);
        res.status(200).json({ data: article });

    } catch (error) {
        return res.status(400).json({
            error: { message: error.message }
        });
    }
};


// DELETE /api/articles/:id
const remove = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({
                error: { message: 'Article Not Found' }
            });
        }

        // destroy() — аналог Mongoose findByIdAndDelete()
        await article.destroy();
        res.status(204).send();

    } catch (error) {
        return res.status(400).json({
            error: { message: error.message }
        });
    }
};


module.exports = { all, getById, create, update, remove };
