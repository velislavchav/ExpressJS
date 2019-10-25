const Course = require('../models/Course');

async function getHome(req, res, next) {
    const user = req.user;
    await Course.find().then(courses => {
        courses.forEach(course => {
            course.user = user;
        });

        res.render('homePage.hbs', { user, courses });
    })

}

module.exports = {
    getHome
}