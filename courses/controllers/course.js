const Course = require('../models/Course');
const User = require('../models/User');
const handler = require('../utils/handleError');


function getCreate(req, res, next) {
    const user = req.user;
    res.render('courses/create', { user });
}

function create(req, res, next) {
    const user = req.user;
    let { title, description, imageUrl, isPublic } = req.body;
    if (isPublic !== true) {
        isPublic = false;
    }

    const creator = user._id;
    const createdAt = Date.now();
    const newCourse = {
        title,
        description,
        imageUrl,
        isPublic,
        creator,
        createdAt
    }

    Course.create(newCourse).then(() => {
        res.redirect('/').catch(err => {
            handler(err, res, user, 'courses/create');
        });
    }).catch(err => {
        handler(err, res, user, 'courses/create');
    });

}

async function getDetails(req, res, next) {
    const user = req.user;
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId);
        let isAuthor = false;
        if (course.creator.toString() === user._id.toString()) {
            isAuthor = true;
        }

        let isEnrolledAlready = false;
        if (user.enrolledCourses.includes(course._id)) {
            isEnrolledAlready = true;
        }
        res.render('courses/details', { course, isAuthor, isEnrolledAlready, user });
    } catch (error) {
        next(e);
    }
}

async function enroll(req, res, next) {
    const user = req.user;
    const courseId = req.params.id;

    try {
        await User.updateOne({ _id: user._id }, { $push: { enrolledCourses: courseId } });
        res.redirect(`/details/${courseId}`);
    } catch (error) {
        next(e);
    }

}

function deleteCourse(req, res, next) {
    const courseId = req.params.id;

    Course.findByIdAndRemove(courseId).then(
        res.redirect('/')
    )
}

async function getEdit(req, res, next) {
    const courseId = req.params.id;
    const user = req.user;
    // console.log(courseId);

    try {
        const course = await Course.findById(courseId);
        res.render('courses/edit', { course, user })
    } catch (error) {
        next(err)
    }
}

function edit(req, res, next) {
    const courseId = req.params.id;
    let { title, description, imageUrl, isPublic } = req.body;
    if (isPublic === 'on') {
        isPublic = true;
    } else {
        isPublic = false;
    }

    Course.updateOne({ _id: courseId }, { title, description, imageUrl, isPublic }).then(() =>
        res.redirect(`/details/${courseId}`)
    )
}

module.exports = {
    getCreate,
    create,
    getDetails,
    enroll,
    deleteCourse,
    getEdit,
    edit
}