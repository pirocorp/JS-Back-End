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
            logout: '/logout',
            profile: '/profile'
        },
    },
    hotelController: {
        path: '/hotels',
        actions: {
            details: '/:id/details',
            create: '/create',
            edit: '/:id/edit',
        }
    }
};

paths.fullPath = (controller, action) => (paths[controller].path + paths[controller].actions[action]);
paths.fullPathWithId = (controller, action, id) => paths.fullPath(controller, action).replace('/:id', id);

module.exports = {
    sessionCookieName,
    paths
}
