const accountsController = require('../controllers/accountsController');
const booksController = require('../controllers/booksController');
const homeController = require('../controllers/homeController');
const defaultController = require('../controllers/defaultController');

const { paths } = require('../globalConstants');

module.exports = (app) => {
    app.use(paths.homeController.path, homeController);
    app.use(paths.accountsController.path, accountsController);
    app.use(paths.booksController.path, booksController);

    // Not found page
    app.all('*', defaultController);
};