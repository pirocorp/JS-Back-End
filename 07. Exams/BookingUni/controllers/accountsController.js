const accountsController = require('express').Router();
const validator = require('validator');

const userService = require('../services/userService');
const { parseError } = require('../utils/parsers');
const { sessionCookieName, paths } = require('../globalConstants');

accountsController.get(paths.accountsController.actions.login, (req, res) => {
    res.render('accounts/login', {
        title: 'Login Page'
    });
});

accountsController.post(paths.accountsController.actions.login, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password);

    try {
        const token = await userService.login(email, password);

        attachToken(res, token);
        res.redirect(paths.homeController.actions.home);
    } catch (error) {
        const errors = parseError(error);

        // TODO: add error display to actual template from assignment
        res.render('accounts/login', {
            title: 'Login Page',
            errors,
            body: {
                email
            }
        });
    }
});

accountsController.get(paths.accountsController.actions.register, (req, res) => {
    res.render('accounts/register', {
        title: 'Register Page'
    });
});

accountsController.post(paths.accountsController.actions.register, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const repass = req.body.repass;
    const email = req.body.email;

    try {
        if (username == '' || password == '') {
            throw new Error('All fields are required');
        }

        if(!validator.isEmail(email)){
            throw new Error('Invalid email');
        }

        if (password.length < 5 ) {
            throw new Error('Passwords must be at least 5 characters long');
        }

        if (password != repass) {
            throw new Error('Passwords don\'t not match');
        }

        const token = await userService.register(email, username, password);

        attachToken(res, token);
        res.redirect(paths.homeController.actions.home);
    } catch (error) {
        const errors = parseError(error);

        // TODO: add error display to actual template from assignment
        res.render('accounts/register', {
            title: 'Register Page',
            errors,
            body: {
                email,
                username
            }
        });
    }
});

accountsController.get(paths.accountsController.actions.logout, (req, res) => {
    res.clearCookie(sessionCookieName);

    // TODO: check assignment to where logout redirects
    res.redirect(paths.homeController.path);
});

accountsController.get(paths.accountsController.actions.profile, (req, res) => {
    res.render('accounts/profile', {
        title: 'Profile Page'
    });
});

const attachToken = (res, token) => {
    res.cookie(sessionCookieName, token, { maxAge: 14400000, httpOnly: true });   
};

module.exports = accountsController;