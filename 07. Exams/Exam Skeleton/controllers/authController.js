const authController = require('express').Router();

const userService = require('../services/userService');
const { parseError } = require('../utils/parsers');
const { sessionCookieName, paths } = require('../globalConstants');

authController.get(paths.authController.actions.login, (req, res) => {
    res.render('accounts/login', {
        title: 'Login Page'
    });
});

authController.post(paths.authController.actions.login, async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        const token = await userService.login(username, password);

        attachToken(res, token);
        // TODO: check assigment for to where login redirects
        res.redirect(paths.homeController.actions.home);
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
authController.get(paths.authController.actions.register, (req, res) => {
    res.render('accounts/register', {
        title: 'Register Page'
    });
});

authController.post(paths.authController.actions.register, async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const repass = req.body.repass.trim();

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
        res.redirect(paths.homeController.actions.home);
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

authController.get(paths.authController.actions.logout, (req, res) => {
    res.clearCookie(sessionCookieName);

    //TODO: check assignment to where logout redirects
    res.redirect(paths.homeController.path);
});

const attachToken = (res, token) => {
    res.cookie(sessionCookieName, token, { maxAge: 14400000, httpOnly: true });   
};

module.exports = authController;