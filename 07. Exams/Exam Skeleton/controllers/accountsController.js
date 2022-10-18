const accountsController = require('express').Router();

const userService = require('../services/userService');
const { parseError } = require('../utils/parsers');
const { sessionCookieName, paths, homePath } = require('../globalConstants');

// TODO: Replace login view with the actual view from assignment
accountsController.get(paths.accountsController.actions.login, (req, res) => {
    res.render('accounts/login', {
        title: 'Login Page'
    });
});

accountsController.post(paths.accountsController.actions.login, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const token = await userService.login(username, password);

        attachToken(res, token);
        // TODO: check assigment for to where login redirects
        res.redirect(homePath);
    } catch (error) {
        const errors = parseError(error);

        // TODO: add error display to actual template from assignment
        res.render('accounts/login', {
            title: 'Login Page',
            errors,
            body: {
                username
            }
        });
    }
});

// TODO: Replace register view with the actual view from assignment
accountsController.get(paths.accountsController.actions.register, (req, res) => {
    res.render('accounts/register', {
        title: 'Register Page'
    });
});

accountsController.post(paths.accountsController.actions.register, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const repass = req.body.repass;

    try {
        if (username == '' || password == '') {
            throw new Error('All fields are required');
        }

        if (password != repass) {
            throw new Error('Passwords don\'t not match');
        }

        const token = await userService.register(username, password);

        // TODO: check assigment to see if register creates session
        attachToken(res, token);
        // TODO: check assigment to where register redirects
        res.redirect(homePath);
    } catch (error) {
        const errors = parseError(error);

        // TODO: add error display to actual template from assignment
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

    // TODO: check assignment to where logout redirects
    res.redirect(homePath);
});

const attachToken = (res, token) => {
    res.cookie(sessionCookieName, token, { maxAge: 14400000, httpOnly: true });   
};

module.exports = accountsController;