const sessionCookieName = 'token';

const paths = {
    homeController: {
        path: '/',
        actions: {
            home: '/'
        }
    },
    accountsController: {
        path: '/accounts',
        actions: {
            login: '/login',
            register: '/register',
            logout: '/logout'
        },
    }
};

paths.fullPath = (controller, action) => (paths[controller].path + paths[controller].actions[action]);
paths.fullPathWithId = (controller, action, id) => paths.fullPath(controller, action).replace(':id', id);

const userLoginPath = paths.fullPath('accountsController', 'login');
const homePath = '/';

module.exports = {
    sessionCookieName,
    paths,
    userLoginPath,
    homePath
}

