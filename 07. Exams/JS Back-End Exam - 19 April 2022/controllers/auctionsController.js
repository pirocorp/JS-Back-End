const auctionsController = require('express').Router();
const auctionService = require('../services/auctionService');

const preloader = require('../middlewares/auctionPreloader');
const { paths, auctionDetailsPath } = require('../globalConstants');
const { hasUser, isOwner } = require('../middlewares/guards');
const { parseError } = require('../utils/parsers');

auctionsController.get(paths.auctions.actions.details, async (req, res) => {
    const auctionId = req.params.id;
    const auction = await auctionService.getDetailsById(auctionId);

    res.render(
        'auctions/details',
        decorateDetailsContext(auction, req.user, {
            title: 'Auction Details Page',
        })
    );
});

auctionsController.get(paths.auctions.actions.publish, hasUser(), (req, res) => {
    res.render('auctions/create', {
        title: 'Publish Auction Page'
    });
});

auctionsController.post(paths.auctions.actions.publish, hasUser(), async (req, res) => {
    const data = req.body;
    const userId = req.user._id;

    try {
        await auctionService.create(data, userId);
        res.redirect(paths.home.actions.browse);
    } catch (error) {
        res.render('auctions/create', {
            title: 'Publish Auction Page',
            errors: parseError(error),
            auction: data
        });
    }
});

auctionsController.get(paths.auctions.actions.edit, preloader(true), isOwner(), (req, res) => {
    const auction = res.locals.auction;

    res.render(
        'auctions/edit',
        decorateEditContext(auction, {
            title: 'Auctions Edit Page',
            auction
        })
    );
});

auctionsController.post(paths.auctions.actions.edit, preloader(), isOwner(), async (req, res) => {
    const auctionId = req.params.id;
    const data = req.body;
    const auction = res.locals.auction;

    try {
        if(auction.bidder && auction.price != data.price){
            throw new Error('Cant change price when there is bidder');
        }

        await auctionService.update(auction, data);
        res.redirect(auctionDetailsPath(auctionId));
    } catch (error) {
        res.render(
            'auctions/edit',
            decorateEditContext(auction, {
                title: 'Auctions Edit Page',
                auction: data,
                errors: parseError(error)
            })
        );
    }
});

auctionsController.get(paths.auctions.actions.delete, preloader(true), isOwner(), async (req, res) => {
    const auctionId = req.params.id;

    await auctionService.deleteById(auctionId);
    res.redirect(paths.home.actions.browse);
});

auctionsController.post(paths.auctions.actions.bid, hasUser(), preloader(true), async (req, res) => {
    const userId = req.user._id;
    const price = Number(req.body.price);
    const auction = res.locals.auction;
    const auctionId = auction._id;

    console.log(auction);

    let errors = [];

    if(auction.author == userId) {
        errors.push('Can\'t bid for your own auction');
    }

    if(auction.bidder == userId) {
        errors.push('You already bid for this auction');
    }

    if(auction.price >= price) {
        errors.push('Your bid must be greater than current price');
    }

    if(errors.length > 0){
        res.render(
            'auctions/details',
            decorateDetailsContext(auction, req.user, {
                title: 'Auction Details Page',
                errors
            })
        );

        return
    }

    await auctionService.bidForAuction(auctionId, price, userId);
    res.redirect(auctionDetailsPath(auctionId));
});

auctionsController.get(paths.auctions.actions.close, preloader(), isOwner(), async (req, res) => {
    const auction = res.locals.auction;
    await auctionService.closeAuction(auction);

    res.redirect(paths.home.actions.closed);
});

module.exports = auctionsController;

const decorateEditContext = (auction, context) => ({
    ...context,
    hasBidder: auction.bidder != null,
    isEstate: auction.category == "Real Estate",
    isVehicles: auction.category == "Vehicles",
    isFurniture: auction.category == "Furniture",
    isElectronics: auction.category == "Electronics",
    isOther: auction.category == "Other",
});

const decorateDetailsContext = (auction, user, context) => {
    const hasUser = user != null;
    let isAuthor = false;
    let canBid = false;

    if (hasUser) {
        const userId = user._id.toString();
        isAuthor = auction.author.toString() == userId;
        canBid = !isAuthor && (!auction.bidder || auction.bidder._id != userId);
    }

    return {
        ...context,
        auction,
        hasUser,
        isAuthor,
        canBid
    }
}