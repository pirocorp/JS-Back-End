const accountsController = require('express').Router();
const { body, validationResult } = require('express-validator');

const userService = require('../services/userService');
const { parseError } = require('../utils/parsers');
const { sessionCookieName, paths, homePath } = require('../globalConstants');
const { isGuest } = require('../middlewares/guards');

accountsController.get(paths.accountsController.actions.login, isGuest(), (req, res) => {
    res.render('accounts/login', {
        title: 'Login Page'
    });
});

accountsController.post(paths.accountsController.actions.login, isGuest(), async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const token = await userService.login(email, password);

        attachToken(res, token);
        res.redirect(homePath);
    } catch (error) {
        const errors = parseError(error);

        res.render('accounts/login', {
            title: 'Login Page',
            errors,
            body: {
                username
            }
        });
    }
});

accountsController.get(paths.accountsController.actions.register, isGuest(), (req, res) => {
    res.render('accounts/register', {
        title: 'Register Page'
    });
});

accountsController.post(paths.accountsController.actions.register, isGuest(),
    body('username')
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long.'),
    body('email')
        .isLength({ min: 10 }).withMessage('Email must be at least 10 characters long.'),
    body('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long.'),

    async (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const repass = req.body.repass;

        try {
            const { errors } = validationResult(req);

            if(errors.length > 0) {
                throw errors;
            }

            if (password != repass) {
                throw new Error('Passwords don\'t not match');
            }

            const token = await userService.register(username, email, password);

            attachToken(res, token);
            res.redirect(homePath);
        } catch (error) {
            const errors = parseError(error);

            res.render('accounts/register', {
                title: 'Register Page',
                errors,
                body: {
                    username
                }
            });
        }
});

accountsController.get(paths.accountsController.actions.logout, (req, res) => {
    res.clearCookie(sessionCookieName);

    res.redirect(homePath);
});

const attachToken = (res, token) => {
    res.cookie(sessionCookieName, token, { maxAge: 14400000, httpOnly: true });
};

module.exports = accountsController;