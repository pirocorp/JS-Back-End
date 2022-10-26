const { userLoginPath, homePath } = require('../globalConstants');

function hasUser() {
    return (req, res, next) => {
        if(req.user) {
            next();
        } else {
            res.redirect(userLoginPath);
        }
    };
};

function isGuest() {
    return (req, res, next) => {
        if(req.user) {
            res.redirect(homePath);
        } else {
            
            next();
        }
    };
};

module.exports = {
    hasUser,
    isGuest
};