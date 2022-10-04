import express, { Express } from 'express';

import { create } from 'express-handlebars';
import { defaultTitle } from '../middlewares/defaultTitle';

const appTitle = "SoftUni Accomodation";

const handlebars = create({
    extname: '.hbs'
});

export default function expressConfig(app: Express) {
    // handlebars configuration
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');
    app.set('views', './views');

    // static files middleware (urlPath, rootFolder);
    app.use('/static', express.static('./static'));

    // middleware for parsing form data(bodyparser) adds body in the req.body object
    app.use(express.urlencoded({ extended: true }));

    // Register user defined middleware for default title
    app.use(defaultTitle(appTitle));
};
