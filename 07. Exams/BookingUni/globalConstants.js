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
            delete: '/:id/delete',
            book: '/:id/book',
        }
    }
};

paths.fullPath = (controller, action) => (paths[controller].path + paths[controller].actions[action]);
paths.fullPathWithId = (controller, action, id) => paths.fullPath(controller, action).replace(':id', id);

const userLoginPath = paths.fullPath('accountsController', 'login');
const getHotelDetailsPath = (id) => paths.fullPathWithId('hotelController', 'details', id);

module.exports = {
    sessionCookieName,
    paths,
    userLoginPath,
    getHotelDetailsPath
}
