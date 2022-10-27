const Crypto = require('../models/Crypto');

async function getAll(searchTerm = null, payment = null) {
    let query = Crypto.find({});

    if(searchTerm){
        searchTerm = searchTerm.toLowerCase();
        const searchRegex = new RegExp(searchTerm, 'i');

        query = query
            .regex('name', searchRegex);
    }

    if(payment) {
        payment = payment.toLowerCase();
        const paymentRegex = new RegExp(payment, 'i');

        query = query
            .regex('payment', paymentRegex);
    }

    return query.lean();
};

async function getById(coinId) {
    return Crypto.findById(coinId).lean();
};

async function getByIdRaw(coinId) {
    return Crypto.findById(coinId);
};

async function create(data, userId) {
    const crypto = {
        name: data.name,
        image: data.image,
        price: Number(data.price),
        description: data.description,
        payment: data.payment,
        owner: userId
    };

    return Crypto.create(crypto);
};

async function update(coin, data) {
    coin.name = data.name;
    coin.image = data.image;
    coin.price = Number(data.price);
    coin.description = data.description;
    coin.payment = data.payment;

    await coin.save();
};

async function deleteById(coinId) {
    return Crypto.findByIdAndDelete(coinId);
};

async function buyCoin(coin, userId){
    coin.buyers.push(userId);

    return await coin.save();
};

module.exports = {
    getAll,
    getById,
    getByIdRaw,
    create,
    update,
    deleteById,
    buyCoin,
};