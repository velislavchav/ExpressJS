const User = require('../models/User');
const Expenses = require('../models/Expenses');

async function getHome(req, res, next) {
    const user = req.user;

    if (user != undefined) {
        const userId = user._id;
        try {
            const foundUser = await User.findById(userId);
            const userExpenses = await foundUser.expenses;
            let expenses = await Expenses.find({ '_id': { $in: userExpenses } })
            await expenses.forEach(exp => {
                exp.user = user;
            })
            res.render('homePage.hbs', { user, expenses });
        } catch (err) {
            next(err)
        }
    } else {
        res.render('homePage.hbs', { user });
    }
}

module.exports = {
    getHome
}