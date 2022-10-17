const accountsController = require('express').Router();
const validator = require('validator');

const userService = require('../services/userService');
const hotelService = require('../services/hotelService');
const { parseError } = require('../utils/parsers');
const { sessionCookieName, paths } = require('../globalConstants');
const { hasUser } = require('../middlewares/guards');

accountsController.get(paths.accountsController.actions.login, (req, res) => {
    res.render('accounts/login', {
        title: 'Login Page'
    });
});

accountsController.post(paths.accountsController.actions.login, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

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

accountsController.get(paths.accountsController.actions.profile, hasUser(), async (req, res) => {
    const userId = req.user._id;
    const bookings = await hotelService.getBookingByUserId(userId);

    console.log(bookings);

    res.render('accounts/profile', {
        title: 'Profile Page',
        user: Object.assign({ bookings }, req.user),
        bookings
    });
});

const attachToken = (res, token) => {
    res.cookie(sessionCookieName, token, { maxAge: 14400000, httpOnly: true });   
};

module.exports = accountsController;