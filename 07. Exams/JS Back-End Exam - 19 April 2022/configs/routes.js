const homeController = require('../controllers/homeController');
const accountsController = require('../controllers/accountsController');
const auctionsController = require('../controllers/auctionsController');
const defaultController = require('../controllers/defaultController');

const { paths } = require('../globalConstants');

module.exports = (app) => {
    app.use(paths.home.path, homeController);
    app.use(paths.accounts.path, accountsController);
    app.use(paths.auctions.path, auctionsController);

    // Not found page
    app.all('*', defaultController);
};