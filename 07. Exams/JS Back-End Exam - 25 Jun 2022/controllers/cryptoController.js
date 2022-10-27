const cryptoController = require('express').Router();
const { body, validationResult } = require('express-validator');
const cryptoService = require('../services/cryptoService');

const preloader = require('../middlewares/coinPreload');
const { paths, coinDetailsPath } = require('../globalConstants');
const { hasUser, isOwner } = require('../middlewares/guards');
const { parseError } = require('../utils/parsers');

cryptoController.get(paths.crypto.actions.details, preloader(true), async (req, res) => {
    const coin = res.locals.coin;

    const hasUser = req.user != null
    let isOwner = false;
    let isBought = false;

    if(hasUser){
        const userId = req.user._id.toString();
        isOwner = hasUser && coin.owner.toString() == userId;
        isBought = !isOwner && coin.buyers.some(x => x.toString() == userId);
    }

    res.render('crypto/details', {
        title: 'Crypto Details Page',
        coin,
        hasUser,
        isOwner,
        isBought
    });
});

cryptoController.get(paths.crypto.actions.create, hasUser(), (req, res) => {
    res.render('crypto/create', {
        title: 'Create Crypto Page'
    });
});

cryptoController.post(paths.crypto.actions.create, hasUser(),
    body('name')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long.'),
    body('image')
        .matches(/^https?:\/\/.+/i)
        .withMessage('Invalid URL'),
    body('price')
        .isNumeric({ min: 0 })
        .withMessage('Price should be a positive number'),
    body('description')
        .isLength({ min: 10 })
        .withMessage('Description should be a minimum of 10 characters long'),
    body('payment')
        .isIn(['crypto-wallet', 'credit-card', 'debit-card', 'paypal'])
        .withMessage('Payment Method must be one of the options'),
    (req, res) => {
        const data = req.body;
        const userId = req.user._id;

        try {
            const { errors } = validationResult(req);

            if(errors.length > 0) {
                throw errors;
            }

            cryptoService.create(data, userId);
            res.redirect(paths.home.actions.catalog);
        } catch (error) {
            res.render('crypto/create', {
                title: 'Create Crypto Page',
                errors: parseError(error),
                coin: data
            });
        }
    }
);

cryptoController.get(paths.crypto.actions.edit, preloader(true), isOwner(), (req, res) => {
    const coin = res.locals.coin;
    const isCryptoWallet = coin.payment == 'crypto-wallet';
    const isCreditCard = coin.payment == 'credit-card';
    const isDebitCard = coin.payment == 'debit-card';
    const isPaypal = coin.payment == 'paypal';

    res.render('crypto/edit', {
        title: 'Crypto Edit Page',
        coin,
        isCryptoWallet,
        isCreditCard,
        isDebitCard,
        isPaypal
    });
});

cryptoController.post(paths.crypto.actions.edit, preloader(), isOwner(), async (req, res) => {
    const coinId = req.params.id;
    const data = req.body;
    const coin = res.locals.coin;

    try {
        await cryptoService.update(coin, data);
        res.redirect(coinDetailsPath(coinId));
    } catch (error) {
        res.render('crypto/edit', {
            title: 'Crypto Details Page',
            coin: data,
            errors: parseError(error)
        });
    }
});

cryptoController.get(paths.crypto.actions.buy, preloader(), hasUser(), async (req, res) => {
    const coinId = req.params.id;
    const userId = req.user._id.toString();
    const coin = res.locals.coin;

    const isOwner = coin.owner.toString() == userId;
    const isAvailable = !isOwner && !coin.buyers.some(x => x.toString() == userId);

    if(isAvailable){
        await cryptoService.buyCoin(coin, userId);
    }

    res.redirect(coinDetailsPath(coinId));
});

cryptoController.get(paths.crypto.actions.delete, preloader(true), isOwner(), async (req, res) => {
    const coinId = req.params.id;

    await cryptoService.deleteById(coinId);
    res.redirect(paths.home.actions.catalog);
});

module.exports = cryptoController;