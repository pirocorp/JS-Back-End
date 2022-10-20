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
    },
    courseController: {
        path: '/courses',
        actions: {
            create: '/create',
            details: '/:id/details',
            edit: '/:id/edit',
            delete: '/:id/delete',
            enroll: '/:id/enroll',
        }
    }
};

paths.fullPath = (controller, action) => (paths[controller].path + paths[controller].actions[action]);
paths.fullPathWithId = (controller, action, id) => paths.fullPath(controller, action).replace(':id', id);

const userLoginPath = paths.fullPath('accountsController', 'login');
const homePath = '/';
const courseDetailsPath = (courseId) => paths.fullPathWithId('courseController', 'details', courseId);

module.exports = {
    sessionCookieName,
    paths,
    userLoginPath,
    homePath,
    courseDetailsPath
}

