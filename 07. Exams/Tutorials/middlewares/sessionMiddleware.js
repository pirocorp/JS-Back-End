const userService = require('../services/userService');
const { sessionCookieName, paths } = require('../globalConstants');

module.exports = () => (req, res, next) => {
    const token = req.cookies[sessionCookieName];
    const userLoginPath = paths.fullPath('accountsController', 'login');

    if(token) {
        try {
            const userData = userService.verifyToken(token);
            req.user = userData;

            res.locals.username = userData.username;
        } catch (error) {
            res.clearCookie(sessionCookieName);
            res.redirect(userLoginPath);
            return
        }
    }

    next();
}