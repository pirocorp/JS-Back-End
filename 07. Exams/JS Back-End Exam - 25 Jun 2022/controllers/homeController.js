const homeController = require('express').Router();

const cryptoService = require('../services/cryptoService');
const { paths } = require('../globalConstants');

homeController.get(paths.home.actions.home, (req, res) => {
    res.render('home', {
        title: 'Home Page',
        user: req.user
    });
});

homeController.get(paths.home.actions.catalog, async (req, res) => {
    const coins = await cryptoService.getAll();

    res.render('catalog', {
        title: 'Catalog Page',
        coins
    });
});

homeController.get(paths.home.actions.search, async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const payment = req.query.payment;

    const isCryptoWallet = payment == 'crypto-wallet';
    const isCreditCard = payment == 'credit-card';
    const isDebitCard = payment == 'debit-card';
    const isPaypal = payment == 'paypal';

    const coins = await cryptoService.getAll(searchTerm, payment);

    res.render('search', {
        title: 'Search Page',
        coins,
        searchTerm,
        isCryptoWallet,
        isCreditCard,
        isDebitCard,
        isPaypal,
    });
});

module.exports = homeController;