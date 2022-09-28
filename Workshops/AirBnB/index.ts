import express from 'express';
import { create } from 'express-handlebars';

import homeController from './controllers/homeController';
import catalogController from './controllers/catalogController';
import accomodationController from './controllers/accomodationController';
import { notFound } from './controllers/defaultController';
import { defaultTitle } from './middlewares/defaultTitle';

const port = 3000;
const host = "pirocorp.com";
const appTitle = "SoftUni Accomodation";

const handlebars = create({
    extname: '.hbs'
});

const app = express();

// handlebars configuration
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

// static files middleware (urlPath, rootFolder);
app.use('/static', express.static('./static'));

// middleware for parsing form data adds body in the req object
app.use(express.urlencoded({
    extended: true
}));

// Register user defined middleware for default title
app.use(defaultTitle(appTitle));

// Register controllers
app.use(homeController);
app.use('/catalog', catalogController);
app.use('/accomodation', accomodationController);

// Not found page
app.all('*', notFound);

// start the app
app.listen(port, host, () => console.log(`Server listening on port ${host}:${port}`));