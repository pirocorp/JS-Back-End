const homeController = require('../controllers/homeController');
const accountsController = require('../controllers/accountsController');

const { paths } = require('../globalConstants');

module.exports = (app) => {
    app.use(paths.homeController.path, homeController);
    app.use(paths.accountsController.path, accountsController);
};