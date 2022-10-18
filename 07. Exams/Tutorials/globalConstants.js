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

module.exports = {
    sessionCookieName,
    paths
}

