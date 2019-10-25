const { userController, homeController, courseController } = require('../controllers');
const auth = require('../utils/auth');

module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);

    // Course
    app.get('/create', auth(), courseController.getCreate);
    app.post('/create', auth(), courseController.create);
    app.get('/details/:id', auth(), courseController.getDetails);
    app.get('/enroll/:id', auth(), courseController.enroll);
    app.get('/delete/:id', auth(), courseController.deleteCourse);
    app.get('/edit/:id', auth(), courseController.getEdit);
    app.post('/edit/:id', auth(), courseController.edit);


    app.get('/', auth(false), homeController.getHome);
    app.all('*', auth(false), (req, res, next) => {
        res.render('errors/404')
    });
}