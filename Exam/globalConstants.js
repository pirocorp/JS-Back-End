const sessionCookieName = 'token';

const paths = {
    home: {
        path: '/',
        actions: {
            home: '/',
            catalog: '/catalog',
            profile: '/profile'
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
    blog: {
        path: '/blog',
        actions: {
            details: '/:id/details',
            create: '/create',
            edit: '/:id/edit',
            delete: '/:id/delete',
            follow: '/:id/follow',
        }
    }
};

paths.fullPath = (controller, action) => (paths[controller].path + paths[controller].actions[action]);
paths.fullPathWithId = (controller, action, id) => paths.fullPath(controller, action).replace(':id', id);

const userLoginPath = paths.fullPath('accounts', 'login');
const homePath = '/';

const blogDetailsPath = (blogId) => paths.fullPathWithId('blog', 'details', blogId);

module.exports = {
    sessionCookieName,
    paths,
	userLoginPath,
	homePath,
    blogDetailsPath
};
