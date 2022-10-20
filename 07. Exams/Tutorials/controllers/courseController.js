const courseController = require('express').Router();
const courseService = require('../services/courseService');

const preloader = require('../middlewares/preload');
const { paths, homePath, userLoginPath, courseDetailsPath } = require('../globalConstants');
const { parseError } = require('../utils/parsers');
const { isOwner } = require('../middlewares/guards');

courseController.get(paths.courseController.actions.details, preloader(true), async (req, res) => {
    const userId = req.user._id;
    const course = res.locals.course;

    course.isOwner = course.owner.toString() == userId.toString();
    course.isEnrolled = course.users.map(x => x.toString()).includes(userId);
    
    res.render('courses/details', {
        title: course.title,
        course
    });
});

courseController.get(paths.courseController.actions.create, (req, res) => {
    res.render('courses/create', {
        title: 'Create Course'
    });
});

courseController.post(paths.courseController.actions.create, async (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    };

    try {
        await courseService.create(course);
        res.redirect(homePath);
    } catch (error) {
        res.render('courses/create', {
            title: 'Create Course',
            errors: parseError(error),
            body: course
        });
    }
});

courseController.get(paths.courseController.actions.edit, preloader(), isOwner(), async (req, res) => {
    res.render('courses/edit', {
        title: 'Edit Course',
        course: res.locals.course
    });
});

courseController.post(paths.courseController.actions.edit, preloader(), isOwner(), async (req, res) => {
    const courseId = req.params.id;

    try {        
        await courseService.updateById(courseId, req.body);
        res.redirect(courseDetailsPath(courseId));
    } catch (error) {
        res.render('courses/edit', {
            title: 'Edit Course',
            errors: parseError(error),
            course: req.body
        });
    }
});

courseController.get(paths.courseController.actions.delete, preloader(), isOwner(), async (req, res) => {
    const courseId = req.params.id;
    
    await courseService.deleteById(courseId);
    res.redirect(homePath);
});

courseController.get(paths.courseController.actions.enroll, preloader(), async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;
    const course = res.locals.course;
   
    if(course.owner.toString() != userId
        && !course.users.map(x => x.toString()).includes(userId)){

        await courseService.enrollUser(courseId, userId);
    }    

    return res.redirect(courseDetailsPath(courseId));
});

module.exports = courseController;