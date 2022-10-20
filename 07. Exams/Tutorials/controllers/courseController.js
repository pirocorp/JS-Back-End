const courseController = require('express').Router();
const courseService = require('../services/courseService');

const { paths, homePath, userLoginPath, courseDetailsPath } = require('../globalConstants');
const { parseError } = require('../utils/parsers');

courseController.get(paths.courseController.actions.details, async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await courseService.getById(courseId);
    course.isOwner = course.owner.toString() == userId;
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

courseController.get(paths.courseController.actions.edit, async (req, res) => {
    const courseId = req.params.id;
    const course = await courseService.getById(courseId);

    if(course.owner.toString() != req.user._id.toString()){
        return res.redirect(userLoginPath);
    }

    res.render('courses/edit', {
        title: 'Edit Course',
        course
    });
});

courseController.post(paths.courseController.actions.edit, async (req, res) => {
    const courseId = req.params.id;
    const course = await courseService.getById(courseId);

    if(course.owner.toString() != req.user._id.toString()){
        return res.redirect(userLoginPath);
    }

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

courseController.get(paths.courseController.actions.delete, async (req, res) => {
    const courseId = req.params.id;
    const course = await courseService.getById(courseId);
    
    if(course.owner.toString() != req.user._id.toString()){
        return res.redirect(userLoginPath);
    }

    await courseService.deleteById(courseId);
    res.redirect(homePath);
});

courseController.get(paths.courseController.actions.enroll, async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;
    const course = await courseService.getById(courseId);
   
    if(course.owner.toString() != userId
        && !course.users.map(x => x.toString()).includes(userId)){

        await courseService.enrollUser(courseId, userId);
    }    

    return res.redirect(courseDetailsPath(courseId));
});

module.exports = courseController;