const hotelController = require('express').Router();

const hotelService = require('../services/hotelService');
const { paths, userLoginPath, getHotelDetailsPath } = require('../globalConstants');
const { parseError } = require('../utils/parsers');

hotelController.get(paths.hotelController.actions.details, async (req, res) => {
    const hotelId = req.params.id;
    const userId = req.user._id;
    const hotel = await hotelService.getbyId(hotelId);

    if(hotel.owner == userId){
        hotel.isOwner = true;
    } else if(hotel.bookings.some(x => x.toString() == userId)) {
        hotel.isBooked = true;
    }
    
    res.render('hotels/details', {
        title: 'Hotel Details',
        hotel
    });
});

hotelController.get(paths.hotelController.actions.create, (req, res) => {
    res.render('hotels/create', {
        title: 'Create Hotel'
    });
});

hotelController.post(paths.hotelController.actions.create, async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id,
    };

    try {
        if(Object.values(hotel).some(v => !v)){
            throw new Error('All fields are required');
        }

        await hotelService.create(hotel);
        res.redirect(paths.homeController.path);
    } catch (error) {
        res.render('hotels/create', {
            title: 'Create Hotel',
            hotel,
            errors: parseError(error),
        });
    }
});

hotelController.get(paths.hotelController.actions.edit, async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await hotelService.getbyId(hotelId);

    if(hotel.owner != req.user._id){
        return res.redirect(userLoginPath)
    }

    res.render('hotels/edit', {
        title: 'Edit Hotel',
        hotel
    });
});

hotelController.post(paths.hotelController.actions.edit, async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await hotelService.getbyId(hotelId);
    
    if(hotel.owner != req.user._id){
        return res.redirect(userLoginPath)
    }

    const edited = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
    };

    try {
        if(Object.values(edited).some(v => !v)){
            throw new Error('All fields are required');
        }

        await hotelService.update(hotelId, edited);
        res.redirect(getHotelDetailsPath(hotelId));
    } catch (error) {
        res.render('hotels/edit', {
            title: 'Edit Hotel',
            hotel: Object.assign(edited, { _id: hotelId }),
            errors: parseError(error),
        });
    }
});

hotelController.get(paths.hotelController.actions.delete, async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await hotelService.getbyId(hotelId);

    if(hotel.owner != req.user._id){
        return res.redirect(userLoginPath)
    }

    await hotelService.deleteById(hotelId);
    res.redirect(paths.homeController.path);
});

hotelController.get(paths.hotelController.actions.book, async (req, res) => {
    const hotelId = req.params.id;
    const userId = req.user._id;
    const hotel = await hotelService.getbyId(hotelId);

    try {
        if(hotel.owner == userId) {
            hotel.isOwner = true;
            throw new Error('Cannot book your own hotel');
        }
    
        await hotelService.bookRoom(hotelId, userId);
        res.redirect(getHotelDetailsPath(hotelId));
    } catch (error) {
        res.render('hotels/details', {
            title: 'Hotel Details',
            hotel,
            errors: parseError(error)
        });
    }
});

module.exports = hotelController;