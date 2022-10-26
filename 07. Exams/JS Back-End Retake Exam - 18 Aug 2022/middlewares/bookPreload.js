const bookService = require('../services/bookService');

module.exports = (isLean) => async (req, res, next) => {   
    const reviewId = req.params.id;
    const book = isLean 
        ? await bookService.getById(reviewId)
        : await bookService.getByIdRaw(reviewId);

    res.locals.book = book;
    next();
};