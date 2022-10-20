const courseService = require('../services/courseService');

module.exports = (isLean) => async (req, res, next) => {   
    const courseId = req.params.id;
    const course = isLean 
        ? await courseService.getById(courseId)
        : await courseService.getByIdRaw(courseId);

    res.locals.course = course;
    next();
};