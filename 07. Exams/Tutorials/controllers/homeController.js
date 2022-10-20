const homeController = require('express').Router();

const { paths } = require('../globalConstants');
const courseService = require('../services/courseService');

homeController.get(paths.homeController.actions.home, async (req, res) => {
    const view = req.user ? 'user-home': 'guest-home';
    const searchTerm = req.query.search;

    const courses = req.user ? await courseService.getAll(searchTerm) : await courseService.getTop();    

    res.render(view, {
        title: 'Home Page',
        courses,
        search: searchTerm
    });
});

module.exports = homeController;