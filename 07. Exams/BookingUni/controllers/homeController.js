const homeController = require('express').Router();

const hotelService = require('../services/hotelService');
const { paths } = require('../globalConstants');


homeController.get(paths.homeController.actions.home, async (req, res) => {
    const hotels = await hotelService.getAll();

    res.render('home', {
        title: 'Home Page',
        hotels
    });
});

module.exports = homeController;