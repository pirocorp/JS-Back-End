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
};

function isOwner() {
    return (req, res, next) => {
        const blog = res.locals.blog;
        const isOwner = req.user && blog.owner.toString() == req.user._id.toString();

        if(isOwner) {
            res.locals.isOwner = true;
            next();
        } else {
            res.redirect(userLoginPath);
        }
    };
};

module.exports = {
    hasUser,
    isGuest,
    isOwner
};