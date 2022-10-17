const Hotel = require("../models/Hotel");

async function getAll() {
    return await Hotel.find({}).lean();
};

async function getById(id) {
    return await Hotel.findById(id).lean();
};

async function getBookingByUserId(userId) {
    return (await Hotel.find({ bookings: userId }).lean())
        .map(h => h.name);
};

async function create(hotel) {
    return await Hotel.create(hotel);
};

async function update(id, hotel) {
    const hotelEntity = await Hotel.findById(id);

    hotelEntity.name = hotel.name;
    hotelEntity.city = hotel.city;
    hotelEntity.rooms = hotel.rooms;
    hotelEntity.imageUrl = hotel.imageUrl;

    await hotelEntity.save();
};

async function deleteById(id) {
    await Hotel.findByIdAndRemove(id);
};

async function bookRoom(hotelId, userId) {    
    const hotel = await Hotel.findById(hotelId);

    if(hotel.bookings.includes(userId)) {
        throw new Error('Cannot book twice');
    }    

    hotel.bookings.push(userId);
    await hotel.save();
};

module.exports = {
    getAll,
    getById,
    create, 
    update,
    deleteById,
    bookRoom,
    getBookingByUserId
};