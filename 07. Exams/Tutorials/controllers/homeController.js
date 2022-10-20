const homeController = require('express').Router();

const { paths } = require('../globalConstants');
const courseService = require('../services/courseService');

homeController.get(paths.homeController.actions.home, async (req, res) => {
    let view = req.user ? 'user-home': 'guest-home';
    let courses = req.user ? await courseService.getAll() : await courseService.getTop();

    res.render(view, {
        title: 'Home Page',
        courses
    });
});

module.exports = homeController;