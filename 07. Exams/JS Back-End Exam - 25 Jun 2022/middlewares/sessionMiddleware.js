const userService = require('../services/userService');
const { sessionCookieName, userLoginPath } = require('../globalConstants');

module.exports = () => (req, res, next) => {
    const token = req.cookies[sessionCookieName];

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