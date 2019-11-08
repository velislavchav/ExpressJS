const { User } = require('../models');
const jwt = require('../utils/jwt');
const handleError = require('../utils/handleError');
const { cookie } = require('../config/config');

function getLogin(req, res, next) {
    res.render('user/loginPage.hbs');
}

async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            handleError('Wrong username or password!', res, user, 'user/loginPage.hbs');
            return;
        }

        const isMatched = await user.matchPassword(password);

        if (!isMatched) {
            handleError('Wrong username or password!', res, user, 'user/loginPage.hbs');
            return;
        }

        const token = jwt.createToken({ id: user._id });
        res.cookie(cookie, token).redirect('/');
    } catch (e) {
        handleError('Wrong username or password!', res, user, 'user/loginPage.hbs');
    }
}

function getRegister(req, res) {
    res.render('user/registerPage.hbs');
}

function register(req, res, next) {
    const { username, password, repeatPassword, amount } = req.body;
    const user = { username, password, repeatPassword, amount };

    const usernameMinLength = 4;
    if (+username.length < usernameMinLength) {
        handleError(`Username should be minimum ${usernameMinLength} characters`, res, user, 'user/registerPage.hbs');
        return;
    }

    const passwordMinLength = 8;
    if (+password.length < passwordMinLength) {
        handleError(`Password should be minimum ${passwordMinLength} characters`, res, user, 'user/registerPage.hbs');
        return;
    }

    if (+amount < 0) {
        handleError(`The amount should be positive`, res, user, 'user/registerPage.hbs');
        return;
    }

    if (password !== repeatPassword) {
        handleError('Passwords not matching', res, user, 'user/registerPage.hbs');
        return;
    }



    const newUser = {
        username,
        password,
        amount
    };

    return User.create(newUser)
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            if (err.code === 11000) {
                handleError('Username is already taken!', res, user, 'user/registerPage.hbs');
                return;
            } else {
                handleError('Try again!', res, user, 'user/registerPage.hbs');
            }
        });
}

function logout(req, res) {
    res.clearCookie(cookie).redirect('/');
}

async function getProfile(req, res) {
    const user = req.user;

    const foundUser = await User.findById(user._id);
    const expensesLength = foundUser.expenses.length;
    user.expensesLength = expensesLength;
    res.render('user/profile', { user })
}
module.exports = {
    getLogin,
    login,
    getRegister,
    register,
    logout,
    getProfile
}
