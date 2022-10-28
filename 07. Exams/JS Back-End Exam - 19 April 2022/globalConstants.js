const sessionCookieName = 'token';

const paths = {
    home: {
        path: '/',
        actions: {
            home: '/',
            browse: '/browse',
            closed: '/closed'
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
    auctions: {
        path: '/auctions',
        actions: {
            publish: '/publish',
            details: '/:id/details',
            edit: '/:id/edit',
            delete: '/:id/delete',
            close: '/:id/close',
            bid: '/:id/bid',
        }
    }
};

paths.fullPath = (controller, action) => (paths[controller].path + paths[controller].actions[action]);
paths.fullPathWithId = (controller, action, id) => paths.fullPath(controller, action).replace(':id', id);

const userLoginPath = paths.fullPath('accounts', 'login');
const homePath = '/';

const auctionDetailsPath = (auctionId) => paths.fullPathWithId('auctions', 'details', auctionId);

module.exports = {
    sessionCookieName,
    paths,
	userLoginPath,
	homePath,
    auctionDetailsPath
}

