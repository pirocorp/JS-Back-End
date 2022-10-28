const homeController = require('express').Router();

const auctionService = require('../services/auctionService');

const { paths } = require('../globalConstants');
const { hasUser } = require('../middlewares/guards');

homeController.get(paths.home.actions.home, (req, res) => {
    res.render('home', {
        title: 'Home Page',
        user: req.user
    });
});

homeController.get(paths.home.actions.browse, async (req, res) => {
    const auctions = await auctionService.getAll();

    res.render('browse', {
        title: 'Browse Auctions',
        auctions
    });
});

homeController.get(paths.home.actions.closed, hasUser(), async (req, res) => {
    const userId = req.user._id;
    const auctions = await auctionService.getAllClosed(userId);

    res.render('closed', {
        title: 'Browse Auctions',
        auctions
    });
});

module.exports = homeController;