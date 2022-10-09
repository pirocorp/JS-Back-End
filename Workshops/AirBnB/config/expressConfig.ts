import express, { Express } from 'express';
import cookieParser from 'cookie-parser';

import { create } from 'express-handlebars';
import { defaultTitle } from '../middlewares/defaultTitleMiddleware';
import { authentication } from '../middlewares/authMiddleware';
import { userNav } from '../middlewares/userNavMiddleware';

const appTitle = "SoftUni Accomodation";

const handlebars = create({
    extname: '.hbs'
});

const jwtSecret = 'f6s54df6DFJa4wer^(^**^&$^&sldDSFkgla64';

export default function expressConfig(app: Express) {
    // handlebars configuration
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');
    app.set('views', './views');

    // static files middleware (urlPath, rootFolder);
    app.use('/static', express.static('./static'));

    // middleware for parsing form data(bodyparser) adds body in the req.body object
    app.use(express.urlencoded({ extended: true }));

    // cookie parser middleware
    app.use(cookieParser());

    // authentication middleware
    app.use(authentication(jwtSecret));

    // user navigation middleware
    app.use(userNav());

    // Register user defined middleware for default title
    app.use(defaultTitle(appTitle));
};
