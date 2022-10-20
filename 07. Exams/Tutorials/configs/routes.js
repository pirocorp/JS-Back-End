const homeController = require('../controllers/homeController');
const accountsController = require('../controllers/accountsController');
const courseController = require('../controllers/courseController');

const { paths } = require('../globalConstants');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use(paths.homeController.path, homeController);
    app.use(paths.accountsController.path, accountsController);
    app.use(paths.courseController.path, hasUser(), courseController);
};