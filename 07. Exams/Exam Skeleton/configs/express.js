const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

const session = require('../middlewares/sessionMiddleware');
const trimBody = require('../middlewares/trimBodyMiddleware');

module.exports = (app) => {
    const hbs = handlebars.create({
        extname: '.hbs'
    });

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    // TODO: Verify that assignment expect trim
    app.use(trimBody('username', 'password'));
    app.use(cookieParser());
    app.use(session());
};