const Book = require('../models/Book');

async function getAll() {
    return Book.find({}).lean();
};

async function getById(reviewId) {
    return await Book.findById(reviewId).lean();
};

async function getByIdRaw(reviewId) {
    return await Book.findById(reviewId);
};

async function create(review) {
    return Book.create(review);
};

async function update(book, data) {
    book.title = data.title;
    book.author = data.author;
    book.genre = data.genre;
    book.stars = Number(data.stars);
    book.image = data.image;
    book.review = data.review;

    await book.save();
};

async function deleteById(reviewId) {
    return await Book.findByIdAndDelete(reviewId);
};

async function wishBook(book, userId) {
    book.wishingList.push(userId);

    return await book.save();
};

async function getWishedBooks(userId) {
    return await Book.find({ wishingList: userId }).lean();
}

module.exports = {
    getAll,
    getById,
    getByIdRaw,
    create,
    update,
    deleteById,
    wishBook,
    getWishedBooks
};