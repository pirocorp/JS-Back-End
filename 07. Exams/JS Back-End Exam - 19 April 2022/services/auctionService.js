const Auction = require('../models/Auction');

async function getAll() {
    return Auction.find({ isClosed: false }).lean();
};

async function getAllClosed(userId) {
    return Auction.find({         
        $and: [
            { isClosed: true },
            { author: userId }
        ]
    }).lean();
}

async function getById(auctionId) {
    return Auction.findById(auctionId).lean();
};

async function getByIdRaw(auctionId) {
    return Auction.findById(auctionId);
};

async function getDetailsById(auctionId) {
    return Auction.findById(auctionId).populate('bidder').lean();
}

async function create(data, userId) {
    const auction = {
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image,
        price: Number(data.price),
        author: userId
    };

    return Auction.create(auction);
};

async function update(auction, data) {
    auction.title = data.title;
    auction.category = data.category;
    auction.price = Number(data.price);
    auction.description = data.description;
    auction.image = data.image;

    return await auction.save();
};

async function deleteById(auctionId) {
    return Auction.findByIdAndDelete(auctionId);
};

async function bidForAuction(auctionId, price, userId) {
    const auction = await Auction.findById(auctionId);
    auction.bidder = userId;
    auction.price = price;

    return await auction.save();
};

async function closeAuction(auction) {
    auction.isClosed = true;

    return await auction.save();
};

module.exports = {
    getAll,
    getAllClosed,
    getById,
    getByIdRaw,    
    getDetailsById,
    create,
    update,
    deleteById,
    bidForAuction,
    closeAuction
};