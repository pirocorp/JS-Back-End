const homeController = require('express').Router();
const booksService = require('../services/bookService');

const { paths } = require('../globalConstants');
const { hasUser } = require('../middlewares/guards');

homeController.get(paths.homeController.actions.home, (req, res) => {
    res.render('home', {
        title: 'Home Page',
        user: req.user
    });
});

homeController.get(paths.homeController.actions.catalog, async(req, res) => {
    const books = await booksService.getAll();

    res.render('catalog', {
        title: 'Catalog Page',
        books
    });
});

homeController.get(paths.homeController.actions.profile, hasUser(), async (req, res) => {
    const userId = req.user._id;
    const books = await booksService.getWishedBooks(userId);

    res.render('profile', {
        title: 'Profile Page',
        books
    });
});

module.exports = homeController;