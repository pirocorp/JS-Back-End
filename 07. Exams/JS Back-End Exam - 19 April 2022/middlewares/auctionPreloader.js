const auctionService = require('../services/auctionService');

module.exports = (isLean) => async (req, res, next) => {   
    const aucitonId = req.params.id;
    const auction = isLean 
        ? await auctionService.getById(aucitonId)
        : await auctionService.getByIdRaw(aucitonId);

    if(!auction){
        res.redirect('/404');
        return
    }

    res.locals.auction = auction;
    next();
};