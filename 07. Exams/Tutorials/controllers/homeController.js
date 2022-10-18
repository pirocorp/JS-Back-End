const homeController = require('express').Router();

const { paths } = require('../globalConstants');

homeController.get(paths.homeController.actions.home, (req, res) => {
    let view = req.user ? 'user-home': 'guest-home';

    res.render(view, {
        title: 'Home Page'
    });
});

module.exports = homeController;