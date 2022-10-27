const sessionCookieName = 'token';

const paths = {
    home: {
        path: '/',
        actions: {
            home: '/',
            catalog: '/catalog',
            search: '/search'
        }
    },
    accounts: {
        path: '/accounts',
        actions: {
            login: '/login',
            register: '/register',
            logout: '/logout'
        },
    },
    crypto: {
        path: '/crypto',
        actions: {
            create: '/create',
            details: '/:id/details',
            edit: '/:id/edit',
            delete: '/:id/delete',
            buy: '/:id/buy'
        }
    }
};

paths.fullPath = (controller, action) => (paths[controller].path + paths[controller].actions[action]);
paths.fullPathWithId = (controller, action, id) => paths.fullPath(controller, action).replace(':id', id);

const userLoginPath = paths.fullPath('accounts', 'login');
const homePath = '/';

const coinDetailsPath = (coinId) => paths.fullPathWithId('crypto', 'details', coinId);

module.exports = {
    sessionCookieName,
    paths,
	userLoginPath,
	homePath,
    coinDetailsPath,
}
