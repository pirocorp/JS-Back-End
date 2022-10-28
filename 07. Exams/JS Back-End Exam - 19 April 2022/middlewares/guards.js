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

function isOwner() {
    return (req, res, next) => {
        const auction = res.locals.auction;
        const isOwner = req.user && auction.author.toString() == req.user._id.toString();

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