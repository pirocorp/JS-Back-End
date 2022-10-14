const homeController = require('express').Router();

const { paths } = require('../globalConstants');

// TODO: Replace with real controller by assignment
homeController.get(paths.homeController.actions.home, (req, res) => {
    console.log();

    res.render('home', {
        title: 'Home Page',
        user: req.user
    });
});

module.exports = homeController;