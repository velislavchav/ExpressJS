const { userController, homeController, expensesController } = require('../controllers');
const auth = require('../utils/auth');

module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/logout', auth(), userController.logout);
    app.get('/profile', auth(), userController.getProfile);


    //  Expenses
    app.post('/refill', auth(), expensesController.refillAmount);
    app.get('/create', auth(), expensesController.getCreate);
    app.post('/create', auth(), expensesController.create);
    app.get('/report/:id', auth(), expensesController.report);
    app.get('/delete/:id', auth(), expensesController.deleteExpense);

    // Home
    app.get('/', auth(false), homeController.getHome);
    app.all('*', auth(false), (req, res, next) => {
        res.render('errors/404')
    });

}