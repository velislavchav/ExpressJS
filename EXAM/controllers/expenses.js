const Expenses = require('../models/Expenses');
const User = require('../models/User');
const handler = require('../utils/handleError');

async function refillAmount(req, res, next) {
    const userId = req.user._id;
    const user = req.user;

    const refillAmount = Number(req.body.refillAmount);

    try {
        const userInfo = await User.findById(userId);
        const userCurrentAmount = await userInfo.amount;
        const updatedAmount = Number(userCurrentAmount) + Number(refillAmount);
        User.updateOne({ _id: userId }, { amount: updatedAmount }).then(() =>
            res.redirect(`/`)
        )
    } catch (err) {
        handler(err, res, user, '/')
    }
}

function getCreate(req, res, next) {
    const user = req.user;
    res.render('expenses/create', { user });
}


async function create(req, res, next) {
    const user = req.user;
    const userId = user._id;
    const date = Date.now();
    let { merchant, total, category, description, report } = req.body;

    if (report === 'on') {
        report = true;
    } else {
        report = false;
    }

    const creator = user._id;
    const newExpense = {
        merchant,
        total,
        category,
        description,
        creator,
        report,
        date
    }

    try {
        const createdExpense = await Expenses.create(newExpense);
        const createdExpenseId = await createdExpense._id;
        const userInfo = await User.findById(userId);
        const userCurrentAmount = await userInfo.amount;
        const updatedAmount = Number(userCurrentAmount) - Number(total);

        await User.findByIdAndUpdate({ _id: userId }, { $push: { expenses: createdExpenseId } });
        await User.updateOne({ _id: userId }, { amount: updatedAmount }) //
        res.redirect('/');
    } catch (err) {
        handler(err, res, user, 'expenses/create');
    }

}

async function deleteExpense(req, res, next) {
    const user = req.user;
    const expenseId = req.params.id;

    try {
        await Expenses.findByIdAndRemove(expenseId);
        await User.updateOne({ _id: user._id }, { $pull: { expenses: expenseId } });

        res.redirect('/');
    } catch (e) {
        next(e);
    }
}

function report(req, res, next) {
    const user = req.user;
    const expenseId = req.params.id;

    Expenses.findById(expenseId).then((course) => {
        res.render('expenses/edit', { user, course });
    })
}

module.exports = {
    refillAmount,
    getCreate,
    create,
    deleteExpense,
    report
}