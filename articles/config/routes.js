const { userController, homeController, articleController } = require('../controllers');
const auth = require('../utils/auth');

module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);


    app.get('/create', auth(), articleController.getCreate);
    app.post('/create', auth(), articleController.create);
    app.get('/article/:id', auth(), articleController.getArticleInfo);
    app.get('/delete/:id', auth(), articleController.deleteArticle);
    app.get('/allArticles', articleController.getShowAll);
    app.get('/edit/:id', auth(), articleController.getEdit);
    app.post('/edit/:id', auth(), articleController.editArticle);








    // Example with role
    // app.get('/profile/:id', auth(), permit(['Admin', 'User']), userController.getProfile);

    app.get('/', auth(false), homeController.getHome);
    app.all('*', auth(false), (req, res, next) => {
        res.render('errors/404')
    });

}