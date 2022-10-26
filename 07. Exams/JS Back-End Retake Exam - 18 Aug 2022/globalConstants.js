const sessionCookieName = 'token';

const paths = {
    homeController: {
        path: '/',
        actions: {
            home: '/',
            catalog: '/catalog',
            profile: '/profile'
        }
    },
    accountsController: {
        path: '/accounts',
        actions: {
            login: '/login',
            register: '/register',
            logout: '/logout'
        },
    },
    booksController: {
        path: '/books',
        actions: {
            create: '/create',
            details: '/:id/details',
            edit: '/:id/edit',
            delete: '/:id/delete',
            wish: '/:id/wish',
        }
    }
};

paths.fullPath = (controller, action) => (paths[controller].path + paths[controller].actions[action]);
paths.fullPathWithId = (controller, action, id) => paths.fullPath(controller, action).replace(':id', id);

const userLoginPath = paths.fullPath('accountsController', 'login');
const homePath = '/';

const bookDetailsPath = (reviewId) => paths.fullPathWithId('booksController', 'details', reviewId);

module.exports = {
    sessionCookieName,
    paths,
	userLoginPath,
	homePath,
    bookDetailsPath
}

