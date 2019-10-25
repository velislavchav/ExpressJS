const Article = require('../models/Article');

async function getHome(req, res, next) {
    const user = req.user;

    try {
        let articlesFound = await Article.find();
        let articlesSorted = await articlesFound.sort((ar1, ar2) => ar2.createdAt - ar1.createdAt);
        const articles = await articlesSorted.slice(0, 3);
        res.render('homePage.hbs', { user, articles });
    } catch (error) {
        const errorMessages = Object.entries(err.errors).map(tuple => {
            return tuple[1].message;
        })
        res.render(`/`, { errorMessages })
    }

}

module.exports = {
    getHome
}