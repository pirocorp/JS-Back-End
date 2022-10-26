const booksController = require('express').Router();
const booksService = require('../services/bookService');

const preloader = require('../middlewares/bookPreload');
const { hasUser, isOwner } = require('../middlewares/guards');
const { paths, userLoginPath, bookDetailsPath } = require('../globalConstants');
const { parseError } = require('../utils/parsers');

booksController.get(paths.booksController.actions.details, async (req, res) => {
    const reviewId = req.params.id;
    const book = await booksService.getById(reviewId);
   
    const hasUser = req.user != null
    let isOwner = false;
    let isWish = false;

    if(hasUser){
        const userId = req.user._id;
        isOwner = hasUser && book.owner == userId;
        isWish = !isOwner && book.wishingList.some(x => x == userId);
    }

    res.render('books/details', {
        title: 'Create Review Page',
        book,
        hasUser,
        isOwner,
        isWish
    });
});

booksController.get(paths.booksController.actions.create, hasUser(), (req, res) => {
    res.render('books/create', {
        title: 'Create Review Page'
    });
});

booksController.post(paths.booksController.actions.create, hasUser(), async (req, res) => {
    const review = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: Number(req.body.stars),
        image: req.body.image,
        review: req.body.review,
        owner: req.user._id
    };

    try {
        await booksService.create(review);
        res.redirect(paths.homeController.actions.catalog);
    } catch (error) {
        res.render('books/create', {
            title: 'Create Course',
            errors: parseError(error),
            body: review
        });
    }
});

booksController.get(paths.booksController.actions.edit, preloader(true), isOwner(), async (req, res) => {
    res.render('books/edit', {
        title: 'Create Review Page',
        book: res.locals.book
    });
});

booksController.post(paths.booksController.actions.edit, preloader(), isOwner(), async (req, res) => {
    const reviewId = req.params.id;
    const data = req.body;
    const book = res.locals.book;

    try {
        await booksService.update(book, data);
        res.redirect(bookDetailsPath(reviewId));
    } catch (error) {
        res.render('books/edit', {
            title: 'Create Review Page',
            book: data,
            errors: parseError(error)
        });
    }
});

booksController.get(paths.booksController.actions.delete, preloader(true), isOwner(), async (req, res) => {
    const reviewId = req.params.id;

    await booksService.deleteById(reviewId);
    res.redirect(paths.homeController.actions.catalog);
});

booksController.get(paths.booksController.actions.wish, preloader(), hasUser(), async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user._id;
    const book = res.locals.book;

    const isOwner = book.owner == userId;
    const isWish = !isOwner && book.wishingList.some(x => x == userId);

    if(!isWish){
        await booksService.wishBook(book, userId);
    }

    res.redirect(bookDetailsPath(reviewId));
});

module.exports = booksController;
