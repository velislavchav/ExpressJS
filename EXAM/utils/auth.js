const jwt = require('./jwt');
const { cookie } = require('../config/config');
const { User } = require('../models');
const handleError = require('./handleError');


function auth(isAuth = true) {
    return async function (req, res, next) {
        const token = req.cookies[cookie] || '';

        try {
            const data = await jwt.verifyToken(token);
            const user = await User.findById(data.id);

            // If have roles
            // if(user) {
            //     if (user.role.includes('Admin')) {
            //         user.isAdmin = true;
            //     } else if (user.role.includes('User')) {
            //         user.isUser = true;
            //     }
            // }

            req.user = user;
            next();
        } catch (e) {
            if (!isAuth) {
                next();
                return;
            }

            if (e.message === 'jwt must be provided' || e.message === 'token expired') {
                handleError(res, 'authentication', e.message);
                res.render('user/loginPage.hbs');
                return;
            }

            next(e);
        }
    }
}

module.exports = auth