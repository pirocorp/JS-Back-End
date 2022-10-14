const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

const { paths } = require('../globalConstants');

module.exports = (app) => {
    app.use(paths.homeController.path, homeController);
    app.use(paths.authController.path, authController);
};