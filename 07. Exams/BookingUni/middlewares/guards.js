const { paths } = require('../globalConstants');
const { userLoginPath } = require('../globalConstants');

function hasUser() {
    return (req, res, next) => {
        if(req.user) {
            next();
        } else {
            // TODO: Check assignment for redirect destination
            res.redirect(userLoginPath);
        }
    };
};

function isGuest() {
    return (req, res, nect) => {
        if(req.user) {
            // TODO: Check assignment for redirect destination
            res.redirect(paths.homeController.actions.home);
        } else {
            
            next();
        }
    };
}

module.exports = {
    hasUser,
    isGuest
};