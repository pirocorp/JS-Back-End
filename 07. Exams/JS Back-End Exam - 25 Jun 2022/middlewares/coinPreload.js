const cryptoService = require('../services/cryptoService');

module.exports = (isLean) => async (req, res, next) => {   
    const coinId = req.params.id;
    const coin = isLean 
        ? await cryptoService.getById(coinId)
        : await cryptoService.getByIdRaw(coinId);

    if(!coin){
        res.redirect('/404');
        return
    }

    res.locals.coin = coin;
    next();
};