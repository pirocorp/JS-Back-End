const homeController = require('../controllers/homeController');
const accountsController = require('../controllers/accountsController');
const cryptoController = require('../controllers/cryptoController');
const defaultController = require('../controllers/defaultController');

const { paths } = require('../globalConstants');

module.exports = (app) => {
    app.use(paths.home.path, homeController);
    app.use(paths.accounts.path, accountsController);
    app.use(paths.crypto.path, cryptoController)

    // Not found page
    app.all('*', defaultController);
};