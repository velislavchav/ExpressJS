function getHome(req, res, next) {
    const user = req.user;
    res.render('homePage.hbs', { user });
}

module.exports = {
    getHome
}