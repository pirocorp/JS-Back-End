import express from 'express';
import { create } from 'express-handlebars';

const port = 3000;
const host = "pirocorp.com"

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

app.listen(port, host, () => console.log(`Server listening on port ${host}:${port}`));