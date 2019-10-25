const { userController, homeController, modelController } = require('../controllers');
const auth = require('../utils/auth');

module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);

    //  Models

    app.get('/', auth(false), homeController.getHome);
    app.all('*', auth(false), (req, res, next) => {
        res.render('errors/404')
    });

}