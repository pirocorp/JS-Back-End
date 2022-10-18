const { userLoginPath, homePath } = require('../globalConstants');

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
    return (req, res, next) => {
        if(req.user) {
            // TODO: Check assignment for redirect destination
            res.redirect(homePath);
        } else {
            
            next();
        }
    };
}

module.exports = {
    hasUser,
    isGuest
};