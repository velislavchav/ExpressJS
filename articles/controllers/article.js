const Article = require('../models/Article');
const handler = require('../utils/handleError');

function getCreate(req, res, next) {
    const user = req.user;
    res.render('articles/create', { user });
}

function create(req, res, next) {
    const { title, content } = req.body;
    const user = req.user;
    const author = user._id;
    const createdAt = Date.now();

    Article.create({ title, content, author, createdAt }).then(() => {
        res.redirect('/')
    }).catch(err => {
        handler(err, res, user, 'articles/create');
    })
}

async function getArticleInfo(req, res, next) {
    const articleId = req.params.id;
    const user = req.user;
    try {
        const article = await Article.findById(articleId);
        res.render('articles/showWholeInfo', { article, user })
    } catch (err) {
        next(err)
    }
}

function deleteArticle(req, res, next) {
    const articleId = req.params.id;

    Article.deleteOne({ _id: articleId }).then(() => {
        res.redirect('/')
    })
}

async function getShowAll(req, res, next) {
    const user = req.user;
    try {
        const articles = await Article.find();
        res.render('articles/showAll', { articles, user })
    } catch (err) {
        next(err)
    }
}

async function getEdit(req, res, next) {
    const user = req.user;
    const articleId = req.params.id;
    try {
        const article = await Article.findById(articleId);
        res.render('articles/edit', { article, user })
    } catch (err) {
        next(err)
    }
}

function editArticle(req, res, next) {
    const user = req.user;
    const articleId = req.params.id;
    const { content } = req.body;


    Article.updateOne({ _id: articleId }, { content }).then(() => {
        res.redirect(`/article/${articleId}`)
    }).catch(err => {
        handler(err, res, user, 'articles/edit');
    })
}


module.exports = {
    getCreate,
    create,
    getArticleInfo,
    deleteArticle,
    getShowAll,
    getEdit,
    editArticle
}