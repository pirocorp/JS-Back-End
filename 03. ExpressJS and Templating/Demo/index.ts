import express from 'express';
import { create } from 'express-handlebars';

import homeController from './controllers/homeController';
import catalogController from './controllers/catalogController';
import createController from './controllers/createController';
import deleteController from './controllers/deleteController';

import demoController from './controllers/demo/demoController';
import demoCatalogController  from './controllers/demo/catalogController';
import demoCreateController from './controllers/demo/createController';

import { globalLogger } from './middlewares/logger';

const handlebars = create({
    extname: '.hbs',
});

const app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', './dist/views');

app.use(globalLogger()); // loging middleware user-defined
app.use(express.static('dist')); // middleware serving static files
app.use(express.urlencoded({
    extended: false
})); // middleware for parsing form data adds body in the req object

app.use(homeController);

app.use('/catalog', catalogController);
app.use('/create', createController);
app.use('/delete', deleteController);

app.use('/demo', demoController);
app.use('/demo/catalog', demoCatalogController);
app.use('/demo/create', demoCreateController);

app.all('*', (req, res) => {
    res.status(404).send('404 Not Found!');
})

app.listen(3000);